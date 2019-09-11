import * as actions from '../athleteActions';

describe('Athlete Actions', () => {
  it('should create an action to input a new athlete', () => {
    const newAthleteInput = 'Athlete1';
    expect(actions.newAthleteInput(newAthleteInput)).toMatchSnapshot();
  });

  it('should create an action to add an athlete', () => {
    expect(actions.addAthlete()).toMatchSnapshot();
  });

  it('should create an action to add an athlete error', () => {
    expect(actions.addAthleteError()).toMatchSnapshot();
  });

  it('should create an action to add an athlete to the watch', () => {
    const id = 'id_123';
    const name = 'Athlete1';
    expect(actions.addAthleteToWatch(id, name)).toMatchSnapshot();
  });

  it('should create an action to remove an athlete from the watch', () => {
    const id = 'id_123';
    expect(actions.removeAthleteFromWatch(id)).toMatchSnapshot();
  });

  it('should create an action to delete an athlete', () => {
    const id = 'id_123';
    expect(actions.deleteAthlete(id)).toMatchSnapshot();
  });
});
