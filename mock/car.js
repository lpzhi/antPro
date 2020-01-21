const getCar = (req, res) => {
    res.json([
        { id: 1,
          setup: 'Did you hear about the two silk worms in a race?',
          punchline: 'It ended in a tie 1111',
        },
        {
          id: 2,
          setup: 'What happens to a frog\'s car when it breaks down?',
          punchline: 'It gets toad away 2222 ',
        },
      ]);
  };
  
  export default {
    'GET /api/car': getCar,
  };
  