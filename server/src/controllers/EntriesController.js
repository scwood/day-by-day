import moment from 'moment';

class EntriesController {

  getEntries(req, res) {
    const entries = req.user.entries.map(({ _id, date }) => ({ _id, date }));
    res.send({ data: { entries }});
  }

  getEntry(req, res) {
    const entry = req.user.entries.find(entry => {
      return entry._id.equals(req.params.id);
    });
    if (!entry) {
      res.status(404).send({ error: 'Entry with that id does not exist' });
      return;
    }
    res.send({ data: { entry }});
  }

  postEntry(req, res) {
    const { date, text } = req.body;
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
      res.status(400).send({
        error: 'Date format is invalid, correct format: YYYY-MM-DD'
      });
    }
    const { user } = req;
    const entryExists = user.entries.some(entry => entry.date === date);
    if (entryExists) {
      res.status(403).send({ error: 'Entry with that date already exists '});
      return;
    }
    user.entries.push({ date, text });
    user.save();
    res.status(201).send({
      data: { entry: user.entries[user.entries.length - 1] },
    });
  }

  patchEntry(req, res) {
    res.sendStatus(501);
  }

  deleteEntry(req, res) {
    const { user } = req;
    const index = user.entries.findIndex(entry => {
      return entry._id.equals(req.params.id);
    });
    if (index === -1) {
      res.status(404).send({ error: 'Entry with that id does not exist' });
      return;
    }
    user.entries.splice(index, 1);
    user.save();
    res.send({ data: { success: true } });
  }
}

export default EntriesController;
