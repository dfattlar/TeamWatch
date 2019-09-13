import * as actions from '../historyActions';

describe('History Actions', () => {
  it('should create an action to delete a history item', () => {
    const id = 'id_123';
    expect(actions.deleteHistory(id)).toMatchSnapshot();
  });
});
