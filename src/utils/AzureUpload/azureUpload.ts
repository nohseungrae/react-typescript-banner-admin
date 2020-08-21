import * as Azure from "./bundle/azure-storage.blob";
import {extname} from 'path';
import * as azure from "azure-storage";

const getBlobService = () : any=> {
    const account = "saracencentre";
    const sas = "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-02T16:08:34Z&st=2020-08-21T08:08:34Z&spr=https,http&sig=zCpw%2BVoj0qGcBaly1ILorCSN9nGuXiR9f92%2Bhi8827c%3D";
    const blobUri = "https://" + account + ".blob.core.windows.net";

    const blobService = Azure.createBlobServiceWithSas(blobUri, sas).withFilter(
        new Azure.ExponentialRetryPolicyFilter()
    );
    const blobUtilities = Azure.BlobUtilities
    if (!blobService) {
        alert(
            "Azure Storage 연결에 실패했습니다."
        );
        return new Error("Azure Storage 연결에 실패했습니다.")
    }
    return {blobService,blobUtilities};
};

const editFileName = (file: File) => {

    const fileExtName = extname(file.name);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    return `${Date.now()}${randomName}${fileExtName}`
}

const uploadBlobByStream = (checkMD5: any, blobService: any, file: File, name: string, newName: string) => {

    const blockSize =
        file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
    const options = {
        storeBlobContentMD5: checkMD5,
        blockSize,
    };
    blobService.singleBlobPutThresholdInBytes = blockSize;

    let finishedOrError = false;

    blobService.createBlockBlobFromBrowserFile(
        name,
        newName,
        file,
        options,
        (error: Error, result: any) => {
            finishedOrError = true;
            if (error) {
                alert("Upload failed, open browser console for more detailed info.");
                console.log(error);
                return new Error("Upload 실패")
            } else {
                alert("Upload successfully!");
            }
        }
    );

};
const listContainer = (blobService: any, container: string) => {
    blobService.listBlobsSegmented(container, null, (error: Error, results: any) => {
        if (error) {
            alert("컨테이너 리스트 오류");
            return new Error("컨테이너 리스트 오류.");
        } else {
            for (let i = 0, container; container = results.entries[i]; i++) {
                // Deal with container object
                console.log(container);
            }
        }
    });
}
export const createContainerAndUpload = (containerName: string, file: File) => {

    const blobService = getBlobService().blobService;
    const blobUtilities = getBlobService().blobUtilities;

    console.log(containerName, file, blobService, 1)

    if (!Azure.Validate.containerNameIsValid(containerName)) {
        alert("Invalid container name!");
        return new Error("유효하지 않은 컨테이너 이름입니다.");
    }
    const newName = editFileName(file);
    blobService.createContainerIfNotExists(
        containerName,
        (error: any, result: any) => {
            if (error) {
                alert(
                    "컨테이너 생성에 실패했습니다. 콘솔을 통해 디테일한 정보를 확인하세요."
                );
                return new Error("컨테이너 생성에 실패했습니다. 콘솔을 통해 디테일한 정보를 확인하세요.");
            } else {
                console.log(result);
                console.log(containerName + " 컨테이너를 성공적으로 생성하였습니다.");

                uploadBlobByStream(false, blobService, file, containerName, newName);
                listContainer(blobService, containerName)
            }
        }
    );
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 5);
    const sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: blobUtilities.SharedAccessPermissions.READ,
            Start: startDate,
            Expiry: expiryDate,
        },
    };


    const sasToken = blobService.generateAccountSharedAccessSignature(containerName, newName, sharedAccessPolicy);
    const sasUrl = blobService.getUrl(containerName, newName, sasToken);
    return {
        url: sasUrl,
        originalName: file.name
    };
};
