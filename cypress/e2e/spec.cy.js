describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  it('Não adiciona tarefa vazia', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('{enter}');
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Limpa o campo de entrada após adicionar uma tarefa', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Teste limpeza{enter}');
    cy.get('[data-cy=todo-input]')
      .should('have.value', '');
  });

  it('Limpa apenas as tarefas completadas ao clicar em "Clear Completed"', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa A{enter}')
      .type('Tarefa B{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    // Novo seletor por texto do botão
    cy.contains('button', 'Clear completed').click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa B');
  });



});
