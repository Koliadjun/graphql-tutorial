const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean, GraphQLNonNull } = graphql;

const Movies = require('../models/movie')
const Directors = require('../models/director')


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        rate: { type: GraphQLInt },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        director: {
            type: DirectorType,
            resolve({ directorId }, args) {
                return Directors.findById(directorId);
            },
        },
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve({ id }, args) {
                return Movies.find({ directorId: id })
            },
        },
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve({ name, age }, args) {
                const director = new Directors({
                    name,
                    age,
                });
                return director.save();
            },
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: new GraphQLNonNull(GraphQLID) },
                rate: { type: GraphQLInt },
                watched: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, { name, genre, directorId, rate, watched }) {
                const movie = new Movies({
                    name,
                    genre,
                    directorId,
                    rate,
                    watchedd,
                });
                return movie.save();
            },
        },
        deleteDirector: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Directors.findByIdAndRemove(id);
            }
        },
        deleteMovie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Movies.findByIdAndRemove(id);
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, { id, name, age }) {
                return Directors.findByIdAndUpdate(
                    id,
                    { $set: { name, age } },
                    { new: true }
                )
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: new GraphQLNonNull(GraphQLID) },
                rate: { type: GraphQLInt },
                watched: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, { id, name, genre, directorId, rate, watched }) {
                return Movies.findByIdAndUpdate(
                    args.id,
                    { $set: { name, genre, directorId, rate, watched } },
                    { new: true }
                )
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, { id }) {
                return Movies.findById(id);
            }
        },
        director: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, { id }) {
                return Directors.findById(id);;
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve() {
                return Movies.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve() {
                return Directors.find({});
            }
        },
    },
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});