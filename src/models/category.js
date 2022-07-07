const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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
        deletedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

categorySchema.methods.toJSON = function () {
    const category = this.toObject();
    delete category.deletedAt;
    return category;
}

categorySchema.pre('save', function (next) {
    if (!this.isModified('slug')) {
        return next();
    }
    this.slug = slugify(this.name);
    next();
});

module.exports = mongoose.model('Category', categorySchema);