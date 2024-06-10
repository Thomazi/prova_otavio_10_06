import express from 'express';
import AuthRouter from './routes/AuthRoutes';
import PostRouter from './routes/PostRoutes';
import UserRouter from './routes/UserRoutes';

const port = 3000;

const app = express();
app.use(express.json());

app.use(UserRouter);
app.use(PostRouter);
app.use(AuthRouter);

// rota do método POST
app.listen(port, function () {
  console.log(`Server running on port -> ${port}`);
});