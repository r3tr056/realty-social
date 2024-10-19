// Put all GQL queries in this file

import gql from 'graphql-tag';

export const COMPOUND_ACCOUNT_AND_MARKET_QUERY = gql`
    query account($id: ID!) {
        markets {
            exhanageRate
            id
            name
            supplyRate
            symbol
            underlyingAddress
            underlyingName
            underlyingDecimals
            underlyingPrice
        }

        account(id: $id) {
            id
            tokens(where: {cTokenBalance_gt: 0}) {
                cTokenBalance
                id
                lifetimeSupplyIntrestAccrued
                supplyBalanceUnderlying
                symbol
                totalUnderlyingSupplied
            }
        }
    }
`;
