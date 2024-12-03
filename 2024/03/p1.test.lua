local p1 = require(".2024.03.p1")

io.write("--- 2024/03/p1.lua ---\n")

do
  io.write("- example:\n")
  local example = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
  local n = p1.solve(example)
  local expected = 161
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  local file = io.open("./2024/03/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p1.solve(input)
  local expected = 190604937
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
