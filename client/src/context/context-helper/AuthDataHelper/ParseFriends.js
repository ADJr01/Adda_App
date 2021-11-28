export const encodeFriendsData = (friends=[],rfr=[],sfr=[])=> JSON.stringify({
    friends : friends,
        sent   : sfr,
        received : rfr
    });


export const decodeFriendsData = str=> JSON.parse(str);
