import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function DishCard({ dishData }) {
  return (
    <Card
      sx={{ minWidth: 345, width: 345, height: 310, padding: 1, margin: 2 }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={dishData?.Image_URL}
        title="recipe image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dishData?.RecipeName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dishData?.Cuisine} | {dishData?.Course} | {dishData?.Diet}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}
