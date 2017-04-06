const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const solveMatrix = (matrix) => {
  const depth = matrix.length;
  const width = matrix[0].length;
  const roots = matrix[0];

  const travel = (sum, h, w) => {
    if (h === depth) {
      return sum;
    }
    
    sum[0] = sum[0] || [];
    sum[0].push(matrix[h][w]);
    travel(sum, h+1, w);
    
    if (w !== 0) {
      sum[1] = sum[1] || [];
      sum[1].push(matrix[h][w]);
      travel(sum, h+1, w - 1);
    }

    if (w !== (width - 1)) {
      sum[2] = sum[2] || [];
      sum[2].push(matrix[h][w]);
      travel(sum, h + 1, w + 1);
    }
  }

  const results = roots.map(root => {
    return travel([], 0, 0);
  })

  console.log(results);
}

solveMatrix([[3, 1, 4], [1, 5, 9], [2, 6, 5]]);


app.post('/', (req, res, next) => {
  if (!req.body.matrix) return res.status(400).send({error: 'You must pass a matrix as {matrix: []}'});

  const val = solveMatrix(req.body.matrix);

  res.send(val);
});

app.listen(3001);