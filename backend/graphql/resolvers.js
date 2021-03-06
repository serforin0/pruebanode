const Quote = require('../models/quote');

module.exports = {
    quotes: async function () {
        const quotes = await Quote.find();
        return {
            quotes: quotes.map((q) => {
                return {
                    ...q._doc,
                    _id: q._id.toString(),
                };
            }),
        };
    },
    createQuote: async function ({quoteInput}) {
        const quote = new Quote({
            quote: quoteInput.quote,
            author: quoteInput.author
        });
        const createQuote = await quote.save();
        return {
            ...createQuote._doc,
            _id: createQuote._id.toString(),
        }

    },
    updateQuote: async function ({ id, quoteInput}) {
        const quote = await Quote.findById(id);
        if(!quote) {
            throw new Error('No quote found!')
        }
        quote.quote = quoteInput.quote;
        quote.author = quoteInput.author;
        const updateQuote = await quote.save();
        return {
            ...updateQuote._doc,
            _id: updateQuote._id.toString(),
        };
    },
    deleteQuote: async function ({ id, quoteInput}){
        const quote = await Quote.findById(id);
        if(!quote) {
            throw new Error('no quote found');
        }
        await Quote.findByIdAndRemove(id);
        return {
            ...quote._doc,
            _id: quote._id.toString(),
        };
    },
};