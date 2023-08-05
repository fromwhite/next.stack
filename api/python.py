import random
import time
import json
from http.server import BaseHTTPRequestHandler
 
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/python':
            num_points = 1000000
            radius = 424242
            points_inside_circle = 0

            start_time = time.perf_counter()

            for _ in range(num_points):
                x = random.uniform(1, radius)
                y = random.uniform(1, radius)
                distance = x**2 + y**2

                if distance <= radius**2:
                    points_inside_circle += 1

            pi_estimate = 4 * (points_inside_circle / num_points)

            end_time = time.perf_counter()
            execution_time = (end_time - start_time) * 1000

            response = json.dumps({
                "runtime": "Python",
                "message": "%d / %d" % (points_inside_circle,num_points),
                "time": "%.2f milliseconds" % (execution_time),
                "pi":pi_estimate,
            })

            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(response.encode())

        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'404 Not Found')

        return