import EventEmitter from '../src/EventEmitter';

describe('event emitter', () => {
  it('emit', () => {
    const emitter = EventEmitter();
    const keyEvent = 'decoded';
    const callback = jest.fn();
    const param = { data: true };

    emitter.addListener(keyEvent, callback);
    emitter.emit(keyEvent, { data: true });

    expect(callback).toBeCalledWith(param);
  });
});