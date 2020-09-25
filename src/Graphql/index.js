import {gql} from "@apollo/client";

export const GET_BANNERS_ASIWANT = gql`
    query getNewBanners($typeAndCategoryIdInput : TypeAndCategoryIdInput!){
        getNewBanners(typeAndCategoryIdInput : $typeAndCategoryIdInput){
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
            reservedBanners{
                id
                img
                alt
                url
                reservationDate
            }
        }
    }
`;

export const GET_BANNERS_BY_CATEGORYID = gql`
    query getBannerList($categoryId : Float!){
        getBannerListByGraphAndCategoryId(categoryId : $categoryId){
            id
            type
            relationId
            img
            alt
            updatedAt
            reservedBanners{
                id
                img
                alt
                url
                reservationDate
            }
        }
    }
`;

export const GET_BANNERS_BY_TYPE = gql`
    query getBannerList($typeAndCategoryIdInput : TypeAndCategoryIdInput!){
        getBannerListByGraphAndType(typeAndCategoryIdInput : $typeAndCategoryIdInput){
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
            reservedBanners{
                id
                img
                alt
                url
                reservationDate
            }
        }
    }
`;

export const ADD_BANNER = gql`
    mutation Banner($bannerData : BannerInput!){
        addBannerByGraph(bannerData : $bannerData){
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
    mutation Banner($bannerUpdateData : BannerInput!, $id : Float!){
        updateBannerByGraph(bannerUpdateData : $bannerUpdateData, id : $id){
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
    mutation addReservedBanner($reservedBannerData : ReservedBannerInput!){
        addReservedBannerByGraph(reservedBannerData : $reservedBannerData){
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
    mutation deleteBanner($id : Float!){
        deleteBannerByGraph(id : $id)
    }
`;