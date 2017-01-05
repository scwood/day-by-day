import moment from 'moment';

import autobind from 'class-autobind';

class EntriesController {

  constructor() {
    autobind(this);
  }

  getEntries(req, res) {
    const entries = req.user.entries.map(({ _id, date }) => {
      return { _id, date };
    }).sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    res.send({ entries });
  }

  getEntry(req, res) {
    const entry = req.user.entries.find(entry => {
      return entry._id.equals(req.params.id);
    });
    if (!entry) {
      this.sendMissing(res);
      return;
    }
    res.send({ entry });
  }

  postEntry(req, res) {
    const { date, text } = req.body;
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
      this.sendInvalidDateFormat(res);
      return;
    }
    const { user } = req;
    const entryExists = user.entries.some(entry => entry.date === date);
    if (entryExists) {
      res.status(403).send({ error: 'Entry with that date already exists '});
      return;
    }
    user.entries.push({ date, text });
    user.save();
    res.status(201).send({ entry: user.entries[user.entries.length - 1] });
  }

  patchEntry(req, res) {
    const { user } = req;
    const entry = user.entries.find(entry => {
      return entry._id.equals(req.params.id);
    });
    if (!entry) {
      this.sendMissing(res);
      return;
    }
    const { date, text } = req.body;
    if (date !== undefined && !this.validateDateFormat(date)) {
      this.sendInvalidDateFormat(res);
      return;
    }
    date && (entry.date = date);
    text && (entry.text = text);
    user.save();
    res.send({ success: true });
  }

  deleteEntry(req, res) {
    const { user } = req;
    const index = user.entries.findIndex(entry => {
      return entry._id.equals(req.params.id);
    });
    if (index === -1) {
      this.sendMissing(res);
      return;
    }
    user.entries.splice(index, 1);
    user.save();
    res.send({ success: true } );
  }

  validateDateFormat(date) {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }

  sendInvalidDateFormat(res) {
    res.status(400).send({
      error: 'Date format is invalid, correct format: YYYY-MM-DD'
    });
  }

  sendMissing(res) {
    res.status(404).send({ error: 'Entry with that id does not exist' });
  }
}

export default EntriesController;
