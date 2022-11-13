interface ILocalState {
  token: string | null;
}

interface ILocalStore {
  ls: ILocalState;
  getValue: () => string | null;
  updateValue: (token: string) => void;
}

const defaultState = {
  token: null,
} as ILocalState;

export default class LocalStore implements ILocalStore {
  ls: ILocalState;

  constructor() {
    const localStore = localStorage.getItem('Project-manager');
    const ls = localStore ? JSON.parse(localStore) : defaultState;
    this.ls = ls;
  }

  getValue = () => {
    return this.ls.token;
  };

  updateValue = (token: string) => {
    this.ls.token = token;
    localStorage.setItem('Project-manager', JSON.stringify(this.ls));
  };
}
