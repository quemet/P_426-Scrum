export let cafes = [
    {
        id: 1,
        name: "Espresso",
        price: 1,
        image: "URL",
        created: new Date(),
    },
    {
        id: 2,
        name: "Ristretto",
        price: 1,
        image: "URL",
        created: new Date(),
    },
    {
        id: 3,
        name: "Lungo",
        price: 1,
        image: "URL",
        created: new Date(),
    }
];

export const getUniqueId = () => {
    const cafesIds = cafes.map(cafe => cafe.id);
    const maxId = cafesIds.reduce((a, b) => Math.max(a, b));
    return maxId + 1;
};