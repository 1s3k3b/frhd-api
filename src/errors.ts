const Messages: { [key: string]: (...args: any[]) => string } = {
    'NOT_FOUND': (struct, name) => `${struct} ${name ? name + ' ' : ''}not found.`,
    'INVALID_ARG': (name, expected, actual) => `Argument ${name} must be of type ${expected}. Recieved type ${typeof actual}.`,
    'WENT_WRONG': () => 'Something went wrong.',
};

const makeError = (Base: typeof Error, name: string) => class extends Base {
    public code: string;
    constructor(type: string, ...args: string[]) {
        super(Messages[type](...args));
        this.name = name;
        this.code = type;
    }
};

export const FRHDAPIError = makeError(Error, 'FRHDAPIError');
export const ArgumentError = makeError(Error, 'ArgumentError');