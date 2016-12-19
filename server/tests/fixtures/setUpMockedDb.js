import mockgoose from 'mockgoose';
import mongoose from 'mongoose';

before(done => {
  mockgoose(mongoose).then(() => {
    mongoose.connect('mongodb://localhost/test', error => {
      done(error);
    });
  });
});

after(done => {
  mongoose.disconnect();
  done();
});

afterEach(done => {
  mockgoose.reset(done);
});
