
// @desc  get all products
// @route Get /api/v1/products
// @access Public
exports.getProducts = (req,res,next)=>{
    res.status(200).json({success:true,msg:'show all products'})
}


// @desc  get  product
// @route Get /api/v1/products/id
// @access Public
exports.getProduct = (req,res,next)=>{
    res.status(200).json({success:true,msg:`get a product ${req.param}`,hello: req.hello})
}

// @desc  create  product
// @route Post /api/v1/products
// @access Private
exports.createProduct = (req,res,next)=>{
    res.status(200).json({success:true,msg:`create product`})
}


// @desc   update product
// @route Put /api/v1/products
// @access Private
exports.updateProduct = (req,res,next)=>{
    res.status(200).json({success:true,msg:`update product ${req.param}`})
}

// @desc  delete  product
// @route delete /api/v1/products
// @access Public
exports.deleteProduct = (req,res,next)=>{
    res.status(200).json({success:true,msg:`delete product ${req.param}`})
}