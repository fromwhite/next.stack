// [dependencies]
// duktape = "0.5"

extern crate duktape;

use duktape::{Context, EvalFlag, Result};

fn main() -> Result<()> {
    // Create a new JavaScript context
    let ctx = Context::new();

    // Evaluate a JavaScript code
    ctx.eval_string("var result = 2 + 2;")?;

    // Get the result from the JavaScript context
    let result = ctx.get_global_string("result")?;
    println!("Result: {}", result.to_string());

    Ok(())
}