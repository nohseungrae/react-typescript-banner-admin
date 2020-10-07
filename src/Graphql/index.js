import {gql} from "@apollo/client";

export const GET_BANNERS_ASIWANT = gql`
    query getNewBanners($typeAndCategoryIdInput: TypeAndCategoryIdInput!) {
        getNewBanners(typeAndCategoryIdInput: $typeAndCategoryIdInput) {
            adminId
            alt
            backImg
            backImgPos
            color
            createdAt
            updatedAt
            id
            img
            mainCopy
            miniImg
            relationId
            seq
            subCopy
            type
            url
            reservedBanners {
                id
                img
                alt
                url
                reservationDate
                type
                relationId
            }
        }
    }
`;
export const ADD_BANNER = gql`
    mutation Banner($bannerData: BannerInput!) {
        addBannerByGraph(bannerData: $bannerData) {
            adminId
            alt
            backImg
            backImgPos
            color
            createdAt
            id
            img
            mainCopy
            miniImg
            relationId
            seq
            subCopy
            type
            url
        }
    }
`;

export const UPDATE_BANNER = gql`
    mutation Banner($bannerUpdateData: BannerInput!, $id: Float!) {
        updateBannerByGraph(bannerUpdateData: $bannerUpdateData, id: $id) {
            adminId
            alt
            backImg
            backImgPos
            color
            createdAt
            id
            img
            mainCopy
            miniImg
            relationId
            seq
            subCopy
            type
            updatedAt
            url
        }
    }
`;

export const ADD_RESERVEDBANNER = gql`
    mutation addReservedBanner($reservedBannerData: ReservedBannerInput!) {
        addReservedBannerByGraph(reservedBannerData: $reservedBannerData) {
            adminId
            alt
            backImg
            backImgPos
            color
            createdAt
            id
            img
            mainCopy
            miniImg
            relationId
            seq
            subCopy
            type
            updatedAt
            url
        }
    }
`;

export const DELETE_BANNER = gql`
    mutation deleteBanner($id: Float!) {
        deleteBannerByGraph(id: $id)
    }
`;
export const DELETE_RESERVEDBANNER = gql`
    mutation deleteReservedBanner($id: Float!) {
        deleteReservedBannerByGraph(id: $id) {
            success
            id
        }
    }
`;
