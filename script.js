describe('Tic Tac Toe', () => {
  const baseUrl = 'http://localhost:3000'; // Replace with your actual base URL

  it('Loads the game', () => {
    cy.visit(baseUrl + "/main.html");
    cy.get('h1').should('contain', 'Tic Tac Toe');
  });

  it('Allows players to input names and play one move each', () => {
    cy.visit(baseUrl + "/main.html");
    
    // Input player names
    cy.get('#player1').should('be.visible').type('Player1');
    cy.get('#player2').should('be.visible').type('Player2');
    cy.get('#submit').click();

    cy.get('.message').should('contain', "Player1, you're up");

    // Wait for cells to be visible
    cy.get('#1').should('be.visible').click();
    cy.get('#1').should('contain', 'x');

    cy.get('.message').should('contain', "Player2, you're up");
    cy.get('#4').should('be.visible').click();
    cy.get('#4').should('contain', 'o');
  });

  it('Plays full game and Player1 wins', () => {
    cy.visit(baseUrl + "/main.html");

    cy.get('#player1').should('be.visible').type('Player1');
    cy.get('#player2').should('be.visible').type('Player2');
    cy.get('#submit').click();

    cy.get('.message').should('contain', "Player1, you're up");

    const moves = ['#1', '#4', '#2', '#5', '#3']; // Player1 wins
    for (const id of moves) {
      cy.get(id).should('be.visible').click();
    }

    cy.get('.message').should('contain', "Player1 congratulations you won!");
  });

  it('Plays full game and Player2 wins', () => {
    cy.visit(baseUrl + "/main.html");

    cy.get('#player1').should('be.visible').type('Player1');
    cy.get('#player2').should('be.visible').type('Player2');
    cy.get('#submit').click();

    cy.get('.message').should('contain', "Player1, you're up");

    const moves = ['#1', '#4', '#2', '#5', '#8', '#6']; // Player2 wins
    for (const id of moves) {
      cy.get(id).should('be.visible').click();
    }

    cy.get('.message').should('contain', "Player2 congratulations you won!");
  });
});
