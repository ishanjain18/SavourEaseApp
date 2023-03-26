import "../static/IntroContainer.css";

function IntroContainer() {
  return (
    <div className="food-recommendation">
      <h1>Welcome to SavourEase</h1>
      <p>
        Our mission is to help you discover new and exciting food options that
        fit your unique preferences and dietary needs.
      </p>
      <ol>
        <li>
          <strong>Fill Out Our Form:</strong> Answer a few questions about your
          food preferences, dietary restrictions, and other factors that will
          help us tailor our recommendations specifically to you.
        </li>
        <li>
          <strong>Submit Your Form:</strong> Once you've completed the form,
          simply click on the "GET RECOMMENDATIONS" button. Our algorithm will
          process your answers and generate a list of personalized savoury
          recommendations just for you.
        </li>
        <li>
          <strong>Explore Your Recommendations:</strong> Once our algorithm has
          finished generating your recommendations, you'll be presented with a
          list of options that fit your unique needs and preferences. From here,
          you can explore each recommendation in more detail, view ingredient
          quantities, and recipe instructions.
        </li>
        <li>
          <strong>Enjoy Your Cooking!:</strong> Once you've found a dish that
          piques your interest, simply click on the "View More" button to learn
          more about your chosen dish and how to prepare it!
        </li>
      </ol>
      <p>
        At SavourEase, we're committed to providing you with the best possible
        recommendations based on your individual preferences and dietary needs.
        So what are you waiting for? Get started now and discover your new
        favorite dish!
      </p>
    </div>
  );
}

export default IntroContainer;
