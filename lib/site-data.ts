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

  rewardsSignupUrl: string;
  rewardsUrl: string;

  giftCardPurchaseUrl: string;
  giftCardBalanceUrl: string;

  feedbackUrl: string;

  facebookUrl: string;
  instagramUrl: string;

  imageUrl: string;
};

export const SOCIALS = {
  facebook: "https://www.facebook.com/HotTacos",
  instagram: "https://www.instagram.com/hottacosrestaurant/",
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

    orderUrl:
      "https://order.toasttab.com/online/hot-tacos-leamington",

    rewardsSignupUrl:
      "https://www.toasttab.com/hot-tacos-leamington/rewardsSignup",

    rewardsUrl:
      "https://www.toasttab.com/hot-tacos-leamington/rewards",

    giftCardPurchaseUrl:
      "https://order.toasttab.com/egiftcards/hot-tacos-leamington",

    giftCardBalanceUrl:
      "https://www.toasttab.com/hot-tacos-leamington/findcard",

    feedbackUrl:
      "https://www.toasttab.com/feedback/6940942c-314d-4049-9dec-e5d40a296787",

    facebookUrl:
      "https://www.facebook.com/HotTacos",

    instagramUrl:
      "https://www.instagram.com/hottacosrestaurant/",

    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hottacosleamingtonwebapp.firebasestorage.app/o/ht-site%2FScreenshot1.jpg?alt=media&token=f427f5d2-9123-4cfd-a88a-270848f355c3",
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

    orderUrl:
      "https://order.toasttab.com/online/hot-tacos-windsor",

    rewardsSignupUrl:
      "https://www.toasttab.com/hot-tacos-windsor/rewardsSignup",

    rewardsUrl:
      "https://www.toasttab.com/hot-tacos-windsor/rewards",

    giftCardPurchaseUrl:
      "https://order.toasttab.com/egiftcards/hot-tacos-windsor",

    giftCardBalanceUrl:
      "https://www.toasttab.com/hot-tacos-windsor/findcard",

    feedbackUrl:
      "https://www.toasttab.com/feedback/35a28d6f-51fb-497f-86eb-75e5dea67b80",

    facebookUrl:
      "https://www.facebook.com/HotTacos",

    instagramUrl:
      "https://www.instagram.com/hottacoswindsor/",

    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hottacosleamingtonwebapp.firebasestorage.app/o/ht-site%2FHot%20Tacos%20Windsor.jpg?alt=media&token=7e02635b-93e1-4d7a-8293-5e55060f7c08",
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
    "Huarache Tricolor",
    "Enchiladas Tricolor",
    "Quesabirrias",
    "Papas a la Hot Tacos",
    "Orden de Sopes",
    "Carne Asada",
  ],
};

export const SITE = {
  brand: "Hot Tacos Restaurant",
  tagline: "Party in Every Bite",
  valueLine: "Authentic Mexican food, festive energy, and fast ordering.",
};