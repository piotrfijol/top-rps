
const PROGRAM = Symbol('program');
const FREE = Symbol('free');

const terminal = {
    isPrinting: false,
    input: '',
    status: FREE,
    eventAwait: null,
}
