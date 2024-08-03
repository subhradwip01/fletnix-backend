const request = require("supertest");
const app = require("../index"); // Adjust the path as necessary
const { ROUTES } = require("../constants/routes");
describe("----- Show Routes -----", () => {
    let token;

    beforeAll(async () => {
        // Perform a login request to obtain a valid JWT token
        const res = await request(app)
            .post(ROUTES.BASE + ROUTES.AUTH.BASE + ROUTES.AUTH.LOGIN)
            .send({
                email: "kulavisubhradwip18@gmail.com",
                password: "Subhra@123",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data.token");

        // Save the token for use in subsequent tests
        token = res.body.data.token;
    });

    describe("GET /api/shows", () => {
        it("should get shows successfully", async () => {
            const res = await request(app)
                .get(ROUTES.BASE + ROUTES.SHOW.BASE + ROUTES.SHOW.GET_SHOWS)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("message", "Successfully get shows");
            expect(res.body.data).toHaveProperty("shows");
            expect(res.body.data.shows.length).toBe(res.body.data.pageSize);
        });

        it("should fail to get shows without authorization", async () => {
            const res = await request(app).get(
                ROUTES.BASE + ROUTES.SHOW.BASE + ROUTES.SHOW.GET_SHOWS
            );

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("message", "You are not Authorized");
        });

        it("should return only shows with type 'Movie' when type query param is 'Movie'", async () => {
            const res = await request(app)
                .get(`${ROUTES.BASE + ROUTES.SHOW.BASE + ROUTES.SHOW.GET_SHOWS}?type=Movie`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("message", "Successfully get shows");
            expect(res.body.data).toHaveProperty("shows");
            const shows = res.body.data.shows;
            expect(shows.length).toBeGreaterThanOrEqual(0);
            expect(shows.every(show => show.type === "Movie")).toBe(true);
        });
    });

    describe("GET /api/shows/get-details/:id", () => {
        it("should get show details successfully", async () => {
            const showId = "s1";
            const res = await request(app)
                .get(
                    `${ROUTES.BASE}${ROUTES.SHOW.BASE}${ROUTES.SHOW.GET_DETAILS}/${showId}`
                )
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty(
                "message",
                "Show details fetched successfully"
            );
            expect(res.body.data).toHaveProperty("show");
            expect(res.body.data.show).toEqual({
                _id: expect.any(String),

                show_id: "s1",
                type: "Movie",
                title: "Dick Johnson Is Dead",
                director: "Kirsten Johnson",
                country: "United States",
                date_added: "2021-09-24T18:30:00.000Z",
                release_year: 2020,
                rating: "PG-13",
                duration: "90 min",
                listed_in: ["Documentaries"],
                description:
                    "As her father nears the end of his life, filmmaker Kirsten Johnson stages his death in inventive and comical ways to help them both face the inevitable.",
            });
        });

        it("should fail to get show details for a non-existent show", async () => {
            const nonExistentId = "p11212";
            const res = await request(app)
                .get(
                    `${ROUTES.BASE}${ROUTES.SHOW.BASE}${ROUTES.SHOW.GET_DETAILS}/${nonExistentId}`
                )
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty("message", "Show not found");
        });

        it("should fail to get show details without authorization", async () => {
            const showId = "s1";
            const res = await request(app).get(
                `${ROUTES.BASE}${ROUTES.SHOW.BASE}${ROUTES.SHOW.GET_DETAILS}/${showId}`
            );

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("message", "You are not Authorized");
        });
    });
});


describe('------ Show Routes testing with user age < 18 ----', () => {
    let token;
    beforeAll(async () => {
        const res = await request(app)
            .post(ROUTES.BASE + ROUTES.AUTH.BASE + ROUTES.AUTH.LOGIN)
            .send({
                email: 'kulavisubhradwip10@gmail.com',
                password: 'Subhra@123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data.token');
        token = res.body.data.token;
    });
    describe("GET /api/shows", () => {
        it('should not include shows with rating "R" for age < 18', async () => {
            const res = await request(app)
                .get(ROUTES.BASE + ROUTES.SHOW.BASE + ROUTES.SHOW.GET_SHOWS)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            const shows = res.body.data.shows;
            expect(shows.every(show => show.rating !== 'R')).toBe(true);
        });
    })


    describe("GET /api/shows/show-details/:id", () => {
        it('should show not get R rated show details when the user is under age', async () => {
            const showId = "s49";
            const res = await request(app)
                .get(
                    `${ROUTES.BASE}${ROUTES.SHOW.BASE}${ROUTES.SHOW.GET_DETAILS}/${showId}`
                )
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
            expect(res.body).toHaveProperty('message', 'You are under aged to see the show');
        });
    })
});
