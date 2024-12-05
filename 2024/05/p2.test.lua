local p2 = require(".2024.05.p2")

io.write("--- 2024/05/p2.lua ---\n")

do
  io.write("- example:\n")
  local example = [[47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
]]
  local n = p2.solve(example)
  local expected = 123
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  local file = io.open("./2024/05/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p2.solve(input)
  local expected = 5564
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
