/// <reference types="cypress" />
import { getOperationAST, parse } from 'graphql';

export const getOperation = (query) => {
  const parsedQuery = parse(query);
  const operationDefinition = getOperationAST(parsedQuery);

  return {
    name: operationDefinition.name?.value,
  };
};

export const aliasOperation = (
  req,
  operationName,
  response
) => {
  const operation = getOperation(req.body.query);

  console.log(req.body)

  if (!operation.name) {
    throw new Error("Anonymous operations aren't allowed. Operation must have an operation name.");
  }

  if (operation.name === operationName) {
    req.alias = operationName;

    if (response) {
      req.reply({
        ...response,
      });
    } else {
      req.continue();
    }
  }
};