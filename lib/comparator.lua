local comparator = {}

--- @param a integer
--- @param b integer
--- @return boolean
comparator.ascending = function(a, b)
    return a < b
end

--- @param a integer
--- @param b integer
--- @return boolean
comparator.descending = function(a, b)
    return a > b
end

return comparator
