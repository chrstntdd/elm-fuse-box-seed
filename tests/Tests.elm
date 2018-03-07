module Tests exposing (..)

import Test exposing (..)
import Expect
import Main exposing (..)


updateFn : Test
updateFn =
    describe "The update function"
        [ describe "NoOp"
            [ test "does not alter the model" <|
                \_ ->
                    initialModel
                        |> update NoOp
                        |> Tuple.first
                        |> Expect.equal initialModel
            ]
        , describe "Increment"
            [ test "increases the count by 1" <|
                \_ ->
                    initialModel
                        |> update Increment
                        |> Tuple.first
                        |> .count
                        |> Expect.equal 1
            ]
        , describe "Decrement"
            [ test "decreases the count by 1" <|
                \_ ->
                    initialModel
                        |> update Decrement
                        |> Tuple.first
                        |> .count
                        |> Expect.equal -1
            ]
        ]
