export const nameReducer = (state: any, action: { type: any, name: string }) => {
    switch (action.type) {
        case  "img" : {
            return {...state, [action.type]: action.name}
        }
        case  "backImg" : {
            return {...state, [action.type]: action.name}
        }
    }
}