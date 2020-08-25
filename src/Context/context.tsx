import {createContext} from 'react';

interface IInit {
}

const Context = createContext({} as IInit | any);

export default Context;