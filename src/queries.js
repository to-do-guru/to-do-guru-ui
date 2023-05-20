import { gql } from "@apollo/client"

export const GET_HOUSEHOLD = gql`
  query getHousehold($email: String!) {
    household (email: $email) {
      id
      name
      members {
        id
        name
      }
      sunday {
        choreName
        assignedMember
        duration
      }
      monday {
        choreName
        assignedMember
        duration
      }
      tuesday {
        choreName
        assignedMember
        duration
      }
      wednesday {
        choreName
        assignedMember
        duration
      }
      thursday {
        choreName
        assignedMember
        duration
      }
      friday {
        choreName
        assignedMember
        duration
      }
      saturday {
        choreName
        assignedMember
        duration
      }
    }
  }
`

export const GET_HOUSE_INFO = gql`
  query getHousehold($email: String!) {
    household (email: $email) {
      name
      members {
        id
        name
      }
    }
  }
`

export const CHANGE_HOUSE_NAME = gql`
  mutation ($input: UpdateHouseholdInput!) {
    updateHousehold(input: $input) {
      household {
        name
      }
      errors
    }
  }
`


export const DELETE_MEMBER_NAME = gql`
  mutation ($input: MemberDeleteInput!){
    memberDelete(input: $input) {
      member {
          name
          }
          errors
    }
  }
`