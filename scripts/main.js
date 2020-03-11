var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform eequal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var tranform_matrices = [];

    compound_transform = new Matrix(4, 4); // change / remove this

    if(transforms.length == 1) {
        compound_transform = transforms[0].mat4x4;
    }
    else {
        var matrices = [];
        for(var i = transforms.length - 1; i >= 0; i--) {
            matrices.push(transforms[i].mat4x4);
        }
        compound_transform = Matrix.multiply(matrices);
    }

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {

    console.log(vertex);
    // multiple vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
    var final_vertex = new Vector(4); // change / remove this

    var matrices = [compound_transform, vertex];

    final_vertex = Matrix.multiply(matrices);

    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    // update `app.transforms[index].mat4x4`
    if(type.localeCompare("translate") == 0) {
        var tx, ty, tz;
        tx = values[0];
        ty = values[1];
        tz = values[2];
        Mat4x4Translate(app.transforms[index].mat4x4, tx, ty, tz);
    }
    else if(type.localeCompare("scale") == 0) {
        var sx, sy, sz;
        sx = values[0];
        sy = values[1];
        sz = values[2];
        Mat4x4Scale(app.transforms[index].mat4x4, sx, sy, sz);
    }
    else if(type.localeCompare("rotate_x") == 0) {
        console.log(values[0]);
        var theta = values[0] * Math.PI / 180.0;
        console.log(theta);
        console.log(-1 *Math.sin(theta));
        Mat4x4RotateX(app.transforms[index].mat4x4, theta);
    }
    else if(type.localeCompare("rotate_y") == 0) {
        var theta = values[0] * Math.PI / 180.0;
        Mat4x4RotateY(app.transforms[index].mat4x4, theta);
    }
    else if(type.localeCompare("rotate_z") == 0) {
        var theta = values[0] * Math.PI / 180.0;
        Mat4x4RotateZ(app.transforms[index].mat4x4, theta);
    }

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
