import { Box, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import CountUp from 'react-countup';

const ProductOverview = ({ products }) => {
  const cardStyles = {
    padding: 2,
    borderRadius: 2,
    boxShadow: 3,
    textAlign: 'center',
    color: '#fff',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.2s ease-in-out',
    },
  };

  const gradientBackgrounds = {
    total: 'linear-gradient(to right, #4caf50, #81c784)',
    product: 'linear-gradient(to right, #f7971e, #ffd200)',
  };

  // Calculate total products
  const totalProducts = products?.reduce(
    (sum, product) => sum + (product.totalProducts || 0),
    0
  );

  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          borderRadius: '10px',
          background: 'linear-gradient(45deg, #00000073, #4caf50a3)',
          mb: 2,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Overview
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Total Products Summary */}
      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              ...cardStyles,
              background: gradientBackgrounds.total,
            }}
          >
            <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
              Total Products
            </Typography>
            <Typography variant="body1">
              <CountUp end={totalProducts || 0} duration={2} />
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Product Summary by Category */}
      <Grid container spacing={3}>
        {products &&
          products.map((product, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Paper
                sx={{
                  ...cardStyles,
                  background: gradientBackgrounds.product,
                }}
              >
                <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
                  {product.category}
                </Typography>
                <Typography variant="body1">
                  Total Products: {product.totalProducts || 0}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <CountUp end={product.totalProducts || 0} duration={1.5} />
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductOverview;
