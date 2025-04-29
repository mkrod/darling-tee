export const appLogoUri : string = "/dt_logo_cropped_no_bg.png";
export const appName: string = "DarlingTee";
export const appFavicon: string = "/dt_favicon.png";
export const defaultUserDp : string = "https://i.pinimg.com/236x/9d/b6/0b/9db60bcc99768a7b224d7f8647cb95ce.jpg";

export const searchProduct = async (term: string) => {
    alert("search Term from index.ts: " + term)
}

export const formatNumberWithCommas = (num: number) : string => {
    if(typeof num !== "number") return "Invalid Amount"
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function randomString(length = 25) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const returnUrl = ({ goto, params }: { goto: string, params: Record<string, any>}): string => {
  // Join params into the URL path
  const path = Object.values(params).map(String).join("/");

  return `${goto}/${path}`;
};

  


