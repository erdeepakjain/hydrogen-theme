// NOTE: https://shopify.dev/docs/api/customer/latest/mutations/customerAddressCreate
export const CUSTOME_PRODUCT_FILE_UPLOAD_MUTATION = `#graphql
  mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        id
        fileStatus
        alt
        createdAt
      }
      userErrors {
        code
        field
        message
      }
    }
  }`;


