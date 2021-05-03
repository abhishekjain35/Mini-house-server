import { google } from "googleapis";
import axios from "axios";

const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`
);

const parseAddress = (addressComponents: {
  country: string | null;
  countrySubdivisionName: string | null;
  municipality: string | null;
}) => {
  let country = null;
  let admin = null;
  let city = null;

  if (addressComponents.country) {
    country = addressComponents.country;
  }
  if (addressComponents.countrySubdivisionName) {
    admin = addressComponents.countrySubdivisionName;
  }
  if (addressComponents.municipality) {
    city = addressComponents.municipality;
  }

  return { country, admin, city };
};

export const Google = {
  authUrl: auth.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    access_type: "online",
  }),
  logIn: async (code: string) => {
    const { tokens } = await auth.getToken(code);

    auth.setCredentials(tokens);
    const { data } = await google.people({ version: "v1", auth }).people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names,photos",
    });

    return { user: data };
  },
  geocode: async (address: string) => {
    const res = await axios.get(
      `https://api.tomtom.com/search/2/geocode/${address}.json?key=${process.env.TOMTOM_MAPS_KEY}`
    );
    return parseAddress(res.data.results[0].address);
  },
};
