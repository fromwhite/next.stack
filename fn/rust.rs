use rand::Rng;

fn main() {
    let iterations = 1_000_000;
    let mut inside_circle = 0;

    let mut rng = rand::thread_rng();
    for _ in 0..iterations {
        let x = rng.gen::<f64>() * 2.0 - 1.0;
        let y = rng.gen::<f64>() * 2.0 - 1.0;

        if x * x + y * y <= 1.0 {
            inside_circle += 1;
        }
    }

    let pi = 4.0 * (inside_circle as f64) / (iterations as f64);
    println!("Approximated value of pi: {}", pi);
}