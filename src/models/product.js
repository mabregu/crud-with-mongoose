const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

productSchema.methods.toJSON = function () {
    const product = this.toObject();
    delete product.deletedAt;
    return product;
}

productSchema.pre('save', function (next) {
    if (!this.isModified('slug')) {
        return next();
    }
    this.slug = slugify(this.name);
    next();
});

module.exports = mongoose.model('Product', productSchema);
    
