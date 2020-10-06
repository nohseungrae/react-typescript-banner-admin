import {IBanner} from "./Components/Banner/InputCard";

export const DataUtil = {
    objectMap: (list: IBanner[], func: any) => {
        return Object.fromEntries(Object.entries(list).map(func))
    },

    jsonListGroupBy: (list: IBanner[], key: IBanner) => {
        let groupedList: any[] = []

        for (let item of list) {
            if (typeof groupedList[item[key as keyof IBanner] as any] === 'undefined') {
                groupedList[item[key as keyof IBanner] as any] = []
            }
            groupedList[item[key as keyof IBanner] as any].push(item as never)
        }

        return groupedList;
    }
}