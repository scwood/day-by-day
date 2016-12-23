import moment from 'moment';

class EntriesContoller {

  getEntries(req, res) {
    res.sendStatus(501);
  }

  getEntry(req, res) {
    res.sendStatus(501);
  }

  async postEntry(req, res, next) {
    const { date, text } = req.body;
    try {
      if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
        res.status(400).send({
          error: 'Date format is invalid, correct format: YYYY-MM-DD'
        });
      }
    } catch (error) {
      next(error);
    }
  }

  patchEntry(req, res) {
    res.sendStatus(501);
  }
}

export default EntriesContoller;
