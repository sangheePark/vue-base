import gql from 'graphql-tag';
export const codeQuery = gql `
  query codeQuery($filter: PageSearch_CodeInput!) {
    filterCodesJPA(filter: $filter){
      list{
        value
        label
      }
      totalElements
    }
  }  
`;