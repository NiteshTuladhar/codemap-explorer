class MathOperations:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def subtract(a, b):
        return a - b


class StringOperations:
    @staticmethod
    def concatenate_strings(str1, str2):
        return str1 + str2

    @staticmethod
    def count_vowels(s):
        vowels = "aeiouAEIOU"
        return sum(1 for char in s if char in vowels)


def test_math_operations():
    assert MathOperations.add(2, 3) == 5
    assert MathOperations.subtract(5, 2) == 3


def test_string_operations():
    assert StringOperations.concatenate_strings("Hello", "World") == "HelloWorld"
    assert StringOperations.count_vowels("Python is awesome") == 6


def test_division():
    assert divide(10, 2) == 5
    assert divide(5, 0) == "Cannot divide by zero"


def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b


class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width


def test_rectangle():
    rectangle = Rectangle(5, 3)
    assert rectangle.area() == 15


def main():
    test_math_operations()
    test_string_operations()
    test_division()
    test_rectangle()


if __name__ == "__main__":
    main()


class Car:
    pass


class Dog:
    pass


class Book:
    pass


class Person:
    pass


def test_car():
    car = Car()
    assert isinstance(car, Car)


def test_dog():
    dog = Dog()
    assert isinstance(dog, Dog)


def test_book():
    book = Book()
    assert isinstance(book, Book)


def test_person():
    person = Person()
    assert isinstance(person, Person)


def main():
    test_math_operations()
    test_string_operations()
    test_division()
    test_rectangle()
    test_car()
    test_dog()
    test_book()
    test_person()


if __name__ == "__main__":
    main()


# if (/^\s/.test(line)) {
#             isInsideFunction = false;
#           } else {
#             isInsideFunction = true;
#           }
