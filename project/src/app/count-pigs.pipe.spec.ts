import { CountPigsPipe } from './count-pigs.pipe';

describe('CountPigsPipe', () => {
  it('create an instance', () => {
    const pipe = new CountPigsPipe();
    expect(pipe).toBeTruthy();
  });
});
