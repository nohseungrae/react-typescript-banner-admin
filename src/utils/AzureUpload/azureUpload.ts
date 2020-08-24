import * as Azure from "./bundle/azure-storage.blob";
import {extname} from "path";
import * as azure from "azure-storage";

export const getBlobService = (connectionString: string): any => {

    const blobService = Azure.createBlobService(connectionString).withFilter(
        new Azure.ExponentialRetryPolicyFilter()
    );

    if (!blobService) {
        alert("Azure Storage 연결에 실패했습니다.");
        return new Error("Azure Storage 연결에 실패했습니다.");
    }
    return blobService;
};

const editFileName = (file: File) => {
    const fileExtName = extname(file.name);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join("");
    return `${Date.now()}${randomName}${fileExtName}`
};

const uploadBlobByStream = async (
    checkMD5: any,
    blobService: any,
    file: File,
    name: string,
    newName: string,
    lastCheck: boolean,
    list?: boolean
) => {
    const blockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
    const options = {
        storeBlobContentMD5: checkMD5,
        blockSize,
    };
    blobService.singleBlobPutThresholdInBytes = blockSize;

    let finishedOrError = false;

    await blobService.createBlockBlobFromBrowserFile(
        name,
        newName,
        file,
        options,
        (error: Error, result: any) => {
            finishedOrError = true;
            if (error) {
                alert("Upload failed, open browser console for more detailed info.");
                console.log(error);
                return new Error("Upload 실패");
            } else {
                if (lastCheck) {
                    if (list) {
                        listContainer(blobService, name);
                    }
                    alert("Upload successfully!");
                }
            }
        }
    );
};
export const listContainer = (blobService: any, container: string) => {

    blobService.listBlobsSegmented(
        container,
        null,
        (error: Error, results: any) => {
            if (error) {
                alert("컨테이너 리스트 오류");
                return new Error("컨테이너 리스트 오류.");
            } else {
                for (let i = 0, container; (container = results.entries[i]); i++) {
                    // Deal with container object
                    console.log(container);
                }
            }
        }
    );
};
export const createContainerAndUpload = async (connectionString: any, containerName: string, files: File[], list?: boolean) => {
    const blobService = getBlobService(connectionString);

    console.log(containerName, files, blobService, 1);

    if (!Azure.Validate.containerNameIsValid(containerName)) {
        alert("Invalid container name!");
        return new Error("유효하지 않은 컨테이너 이름입니다.");
    }
    const results = await files.map((file, i) => {
        const newName = editFileName(file);
        let lastCheck = false;
        blobService.createContainerIfNotExists(
            containerName,
            (error: any, result: any) => {
                if (error) {
                    alert(
                        "컨테이너 생성에 실패했습니다. 콘솔을 통해 디테일한 정보를 확인하세요."
                    );
                    return new Error(
                        "컨테이너 생성에 실패했습니다. 콘솔을 통해 디테일한 정보를 확인하세요."
                    );
                } else {
                    console.log(result);
                    console.log(result.name + " 컨테이너를 성공적으로 생성하였습니다.");

                    if (i === files.length - 1) {
                        lastCheck = true;
                    }
                    uploadBlobByStream(false, blobService, file, containerName, newName, lastCheck, list);
                }
            }
        );
        const url = blobService.getUrl(containerName, newName, blobService.storageCredentials.sasToken);
        return {url, originalName: file.name}
    })
    return results;

};
