import gql from 'graphql-tag';

export default gql `
  query AllQuestions($query: Pagination!, $param: Code) {
    questionCount
    questions(query: $query) {
      _id
      title
      firstPost {
        _id
        voteCount
      }
    }
  }  
`