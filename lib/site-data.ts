export type BranchKey = "leamington" | "windsor";

export type Branch = {
  key: BranchKey;
  name: string;
  shortName: string;
  city: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  mapsUrl: string;
  orderUrl: string;
  imageUrl: string;
};

export const SOCIALS = {
  facebook: "https://www.facebook.com/HotTacos?mibextid=LQQJ4d",
  instagram: "https://www.instagram.com/hottacosrestaurant?igsh=Y3hkMHBhNDk5M2Rl",
};

export const BRANCHES: Record<BranchKey, Branch> = {
  leamington: {
    key: "leamington",
    name: "Hot Tacos Leamington",
    shortName: "Leamington",
    city: "Leamington",
    address: "16 Talbot Street E, Leamington, ON N8H 1L2",
    phoneDisplay: "+1 (519) 329-1615",
    phoneHref: "tel:+15193291615",
    mapsUrl:
      "https://www.google.com/maps/dir//Hot+Tacos+Mexican+Restaurant/@42.0529949,-82.6816491,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x883ac1874678d4cf:0xd04e2ab656c80fa2!2m2!1d-82.5992483!2d42.0530244?entry=ttu",
    orderUrl: "https://order.tbdine.com/pickup/28824/menu",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mihottacoswebapp.appspot.com/o/Leamington-Hot-Tacos.jpg?alt=media",
  },
  windsor: {
    key: "windsor",
    name: "Hot Tacos Windsor",
    shortName: "Windsor",
    city: "Windsor",
    address: "325 Ouellette Ave, Windsor, ON N9A 4J1",
    phoneDisplay: "+1 (519) 818-5129",
    phoneHref: "tel:+15198185129",
    mapsUrl:
      "https://www.google.com/maps/dir//hot+tacos+windsor+ontario/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x883b2dd18c2079f3:0x7c98cd6cc1c7cbea?sa=X&ved=1t:3061&ictx=111",
    orderUrl: "https://order.tbdine.com/pickup/51513/menu",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mihottacoswebapp.appspot.com/o/Windsor-Hot-Tacos.jpg?alt=media",
  },
};

export const FEATURED_ITEMS = {
  leamington: [
    "Guacamole",
    "Nachos Supreme",
    "Molcajete",
    "Tostadas",
    "Tacos & Quesadillas",
    "Aguas Frescas",
  ],
  windsor: [
    "Sopa Azteca",
    "Carne Asada",
    "Chilaquiles",
    "Pulpo al Gusto",
    "Enchiladas Tricolor",
    "Tacos al Pastor",
  ],
};

export const SITE = {
  brand: "Hot Tacos Restaurant",
  tagline: "Party in Every Bite",
  valueLine: "Authentic Mexican food, festive energy, and fast ordering.",
};