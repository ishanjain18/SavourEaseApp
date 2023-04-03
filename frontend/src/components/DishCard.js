import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipeModal from "./RecipeModal";

export default function DishCard({ dishData }) {
  const [open, setOpen] = useState(false);
  return (
    <Card
      sx={{
        minWidth: 325,
        width: 325,
        minHeight: 335,
        padding: 1,
        margin: 2,
        position: "relative",
      }}
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
      <CardActions sx={{ position: "absolute", bottom: 0 }}>
        <Button size="small" onClick={() => setOpen(true)}>
          View More
        </Button>
        <RecipeModal dishData={dishData} open={open} setOpen={setOpen} />
      </CardActions>
    </Card>
  );
}
