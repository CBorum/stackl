import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Answer from './Answer'
import Comment from './Comment'

class SinglePost extends React.Component {

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        // dispatch(startTest("hej med dig"));
        console.log(this.props)
        // dispatch(getPost(params.postId))
    }

    render() {
        return (
            <div className="App">
                <div>
                    <h1>{this.props.post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
                    <div className="comments">
                        <h3>Comments</h3>
                        {this.props.post.comments.map((c) => {
                            return (<Comment comment={c} />)
                        })}
                    </div>

                    <Answer answer={this.props.post.acceptedAnswerPost} />
                    <div className="answers">
                        <h2>Answers</h2>
                        {this.props.post.answers.map((a) => {
                            return (<Answer answer={a} />)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

SinglePost = withRouter(SinglePost);

const mapStateToProps = (state, ownProps) => ({
    post: {
        "postId": 30373,
        "creationDate": "2008-08-27T15:03:00",
        "closedDate": "2011-03-29T03:44:57",
        "body": "<p>I remember first learning about vectors in the STL and after some time, I wanted to use a vector of bools for one of my projects. After seeing some strange behavior and doing some research, I learned that <a href=\"http://www.informit.com/guides/content.aspx?g=cplusplus&amp;seqNum=98\" rel=\"nofollow\">a vector of bools is not really a vector of bools</a>.</p>&#xA;&#xA;<p>Are there any other common pitfalls to avoid in C++?</p>&#xA;",
        "score": 65,
        "postURI": "http://localhost:5000/api/post/30373",
        "title": "What C++ pitfalls should I avoid?",
        "comments": [
            {
                "commentId": 154388,
                "score": 31,
                "text": "I thought C++ *is* the pitfall you should avoid.",
                "createdDate": "2008-11-22T19:07:43",
                "postId": null,
                "author": {
                    "name": "Cheery",
                    "authorId": 21711
                },
                "post": null
            },
            {
                "commentId": 2878424,
                "score": 0,
                "text": "It is amusing to read the answers in light of professional experience on embedded systems.  (Even when said embedded systems have many processors and a ton of memory.)",
                "createdDate": "2010-05-14T19:12:56",
                "postId": null,
                "author": {
                    "name": "dash-tom-bang",
                    "authorId": 65845
                },
                "post": null
            },
            {
                "commentId": 3342265,
                "score": 8,
                "text": "Uh.. all of them..?",
                "createdDate": "2010-07-13T12:10:39",
                "postId": null,
                "author": {
                    "name": "bobobobo",
                    "authorId": 111307
                },
                "post": null
            }
        ],
        "author": {
            "name": "Craig H",
            "authorId": 2328
        },
        "acceptedAnswerPost": {
            "postId": 30420,
            "creationDate": "2008-08-27T15:17:16",
            "body": "<p>A short list might be:</p>&#xA;&#xA;<ul>&#xA;<li>Avoid memory leaks through use shared pointers to manage memory allocation and cleanup</li>&#xA;<li>Use the <a href=\"https://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization\" rel=\"nofollow\">Resource Acquisition Is Initialization</a> (RAII) idiom to manage resource cleanup - especially in the presence of exceptions</li>&#xA;<li>Avoid calling virtual functions in constructors</li>&#xA;<li>Employ minimalist coding techniques where possible - for example, declaring variables only when needed, scoping variables, and early-out design where possible. </li>&#xA;<li>Truly understand the exception handling in your code - both with regard to exceptions you throw, as well as ones thrown by classes you may be using indirectly. This is especially important in the presence of templates.</li>&#xA;</ul>&#xA;&#xA;<p>RAII, shared pointers and minimalist coding are of course not specific to C++, but they help avoid problems that do frequently crop up when developing in the language. </p>&#xA;&#xA;<p>Some excellent books on this subject are:</p>&#xA;&#xA;<ul>&#xA;<li>Effective C++ - Scott Meyers</li>&#xA;<li>More Effective C++ - Scott Meyers</li>&#xA;<li>C++ Coding Standards - Sutter &amp; Alexandrescu</li>&#xA;<li>C++ FAQs - Cline</li>&#xA;</ul>&#xA;&#xA;<p>Reading these books has helped me more than anything else to avoid the kind of pitfalls you are asking about.</p>&#xA;",
            "score": 72,
            "comments": [
                {
                    "commentId": 189601,
                    "score": 0,
                    "text": "you have specified the correct and best books that i was looking for. :)",
                    "createdDate": "2008-12-11T05:21:00",
                    "postId": null,
                    "author": {
                        "name": "mahesh",
                        "authorId": 38038
                    },
                    "post": null
                },
                {
                    "commentId": 2542466,
                    "score": 5,
                    "text": "\"Avoid calling virtual functions in constructors\" <-- I would upgrade that one from \"Avoid\" to \"Never\". +1 though. (Namely because it's undefined behavior)",
                    "createdDate": "2010-03-29T22:43:45",
                    "postId": null,
                    "author": {
                        "name": "Billy ONeal",
                        "authorId": 82320
                    },
                    "post": null
                },
                {
                    "commentId": 2542479,
                    "score": 0,
                    "text": "Maybe include virtual destructors and how to catch (and rethrow) exceptions correctly?",
                    "createdDate": "2010-03-29T22:44:59",
                    "postId": null,
                    "author": {
                        "name": "Asgeir S. Nilsen",
                        "authorId": 16023
                    },
                    "post": null
                },
                {
                    "commentId": 2550295,
                    "score": 3,
                    "text": "@BillyONeal i would probably leave it to \"avoid\". But in any case, behavior is well defined for virtual calls in constructors. Such a call is not undefined behavior, except when the call happens to a pure virtual function from within a pure virtual class' constructor (and analogous for destructors)",
                    "createdDate": "2010-03-30T21:11:17",
                    "postId": null,
                    "author": {
                        "name": "Johannes Schaub - litb",
                        "authorId": 34509
                    },
                    "post": null
                }
            ],
            "author": {
                "name": "Brian Stewart",
                "authorId": 3114
            }
        },
        "answers": [
            {
                "postId": 30384,
                "creationDate": "2008-08-27T15:07:52",
                "body": "<p>The book <em><a href=\"http://www.semantics.org/cpp_gotchas/\" rel=\"nofollow\">C++ Gotchas</a></em> may prove useful.</p>&#xA;",
                "score": 4,
                "comments": [],
                "author": {
                    "name": "Matt Rogish",
                    "authorId": 2590
                }
            },
            {
                "postId": 30391,
                "creationDate": "2008-08-27T15:09:10",
                "body": "<p>The web page <em><a href=\"http://developer.kde.org/~wheeler/cpp-pitfalls.html\" rel=\"nofollow\">C++ Pitfalls</a></em> by Scott Wheeler covers some of the main C++ pitfalls.</p>&#xA;",
                "score": 7,
                "comments": [],
                "author": {
                    "name": "sparkes",
                    "authorId": 269
                }
            },
            {
                "postId": 30412,
                "creationDate": "2008-08-27T15:15:18",
                "body": "<p>Some must have C++ books that will help you avoid common C++ pitfalls:</p>&#xA;&#xA;<p><a href=\"http://rads.stackoverflow.com/amzn/click/0321334876\" rel=\"nofollow\">Effective C++</a><br />&#xA;<a href=\"http://rads.stackoverflow.com/amzn/click/020163371X\" rel=\"nofollow\">More Effective C++</a><br />&#xA;<a href=\"http://rads.stackoverflow.com/amzn/click/0201749629\" rel=\"nofollow\">Effective STL</a></p>&#xA;&#xA;<p>The Effective STL book explains the vector of bools issue :)</p>&#xA;",
                "score": 16,
                "comments": [],
                "author": {
                    "name": "17 of 26",
                    "authorId": 2284
                }
            },
            {
                "postId": 30426,
                "creationDate": "2008-08-27T15:21:24",
                "body": "<p>The most important pitfalls for beginning developers is to avoid confusion between C and C++. C++ should never be treated as a mere better C or C with classes because this prunes its power and can make it even dangerous (especially when using memory as in C).</p>&#xA;",
                "score": 3,
                "comments": [],
                "author": {
                    "name": "Konrad Rudolph",
                    "authorId": 1968
                }
            },
            {
                "postId": 30449,
                "creationDate": "2008-08-27T15:29:05",
                "body": "<p>Check out <a href=\"http://boost.org\" rel=\"nofollow\">boost.org</a>.  It provides a lot of additional functionality, especially their smart pointer implementations.</p>&#xA;",
                "score": 3,
                "comments": [],
                "author": {
                    "name": "Paul Whitehurst",
                    "authorId": 3261
                }
            },
            {
                "postId": 30470,
                "creationDate": "2008-08-27T15:37:14",
                "body": "<p>I've already mentioned it a few times, but Scott Meyers' books <a href=\"http://rads.stackoverflow.com/amzn/click/0321334876\" rel=\"nofollow\">Effective C++</a> and <a href=\"http://rads.stackoverflow.com/amzn/click/0201749629\" rel=\"nofollow\">Effective STL</a> are really worth their weight in gold for helping with C++.</p>&#xA;&#xA;<p>Come to think of it, Steven Dewhurst's <a href=\"http://rads.stackoverflow.com/amzn/click/0321125185\" rel=\"nofollow\">C++ Gotchas</a> is also an excellent \"from the trenches\" resource. His item on rolling your own exceptions and how they should be constructed really helped me in one project.</p>&#xA;",
                "score": 6,
                "comments": [],
                "author": {
                    "name": "Rob Wells",
                    "authorId": 2974
                }
            },
            {
                "postId": 34064,
                "creationDate": "2008-08-29T06:39:54",
                "body": "<p>Two gotchas that I wish I hadn't learned the hard way:</p>&#xA;&#xA;<p>(1) A lot of output (such as printf) is buffered by default.  If you're debugging crashing code, and you're using buffered debug statements, the last output you see may <em>not</em> really be the last print statement encountered in the code.  The solution is to flush the buffer after each debug print (or turn off the buffering altogether).</p>&#xA;&#xA;<p>(2) Be careful with initializations - (a) avoid class instances as globals / statics; and (b) try to initialize all your member variables to some safe value in a ctor, even if it's a trivial value such as NULL for pointers.</p>&#xA;&#xA;<p>Reasoning: the ordering of global object initialization is not guaranteed (globals includes static variables), so you may end up with code that seems to fail nondeterministically since it depends on object X being initialized before object Y.  If you don't explicitly initialize a primitive-type variable, such as a member bool or enum of a class, you'll end up with different values in surprising situations -- again, the behavior can seem very nondeterministic.</p>&#xA;",
                "score": 6,
                "comments": [
                    {
                        "commentId": 140967,
                        "score": 0,
                        "text": "the solution is not to debug with prints",
                        "createdDate": "2008-11-15T21:59:27",
                        "postId": null,
                        "author": {
                            "name": "Dustin Getz",
                            "authorId": 20003
                        },
                        "post": null
                    },
                    {
                        "commentId": 142705,
                        "score": 0,
                        "text": "Sometimes that is the only option... for example debugging crashes which happen only in Release code and/or on a target architecutre / platform different from which you are developing on.",
                        "createdDate": "2008-11-17T12:48:36",
                        "postId": null,
                        "author": {
                            "name": "xan",
                            "authorId": 15667
                        },
                        "post": null
                    },
                    {
                        "commentId": 176642,
                        "score": 2,
                        "text": "There are definitely more sophisticated ways to debug.  But using prints is tried and true, and works in a lot more places than you might have access to a nice debugger.  I'm not the only one who thinks so - see Pike and Kernighan's Practice of Programming book, for one.",
                        "createdDate": "2008-12-04T18:32:20",
                        "postId": null,
                        "author": {
                            "name": "Tyler",
                            "authorId": 3561
                        },
                        "post": null
                    },
                    {
                        "commentId": 1189986,
                        "score": 0,
                        "text": "+1 for noting the nondeterministic initialisation of global objects. (There are some rules, but they're not as intuitive or complete as we'd like.)",
                        "createdDate": "2009-08-30T10:34:43",
                        "postId": null,
                        "author": {
                            "name": "j_random_hacker",
                            "authorId": 47984
                        },
                        "post": null
                    },
                    {
                        "commentId": 2878412,
                        "score": 0,
                        "text": "printf (and std::cout) is (are) often only line buffered, so as long as you are relatively certain you're not crashing between starting the printf and hitting the newline, you should be ok.  Consider also compiler bugs that prevent the generation of debug symbols <grumble grumble>",
                        "createdDate": "2010-05-14T19:10:42",
                        "postId": null,
                        "author": {
                            "name": "dash-tom-bang",
                            "authorId": 65845
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "Tyler",
                    "authorId": 3561
                }
            },
            {
                "postId": 37369,
                "creationDate": "2008-09-01T02:03:57",
                "body": "<p>PRQA have <a href=\"http://www.codingstandard.com/\" rel=\"nofollow\">an excellent and free C++ coding standard</a> based on books from Scott Meyers, Bjarne Stroustrop and Herb Sutter. It brings all this information together in one document.</p>&#xA;",
                "score": 2,
                "comments": [],
                "author": {
                    "name": "cdv",
                    "authorId": 3836
                }
            },
            {
                "postId": 48676,
                "creationDate": "2008-09-07T18:48:54",
                "body": "<p>Here are a few pits I had the misfortune to fall into. All these have good reasons which I only understood after being bitten by behaviour that surprised me. </p>&#xA;&#xA;<ul>&#xA;<li><p><code>virtual</code> functions in constructors <a href=\"http://stackoverflow.com/questions/36832\" title=\"Virtual functions in constructors, why do languages differ?\">aren't</a>.</p></li>&#xA;<li><p>Don't violate the <a href=\"http://en.wikipedia.org/wiki/One_Definition_Rule\" rel=\"nofollow\">ODR (One Definition Rule)</a>, that's what anonymous namespaces are for (among other things).</p></li>&#xA;<li><p>Order of initialization of members depends on the order in which they are declared.</p>&#xA;&#xA;<pre><code>class bar {&#xA;    vector&lt;int&gt; vec_;&#xA;    unsigned size_; // Note size_ declared *after* vec_&#xA;public:&#xA;    bar(unsigned size)&#xA;        : size_(size)&#xA;        , vec_(size_) // size_ is uninitialized&#xA;        {}&#xA;};&#xA;</code></pre></li>&#xA;<li><p>Default values and <code>virtual</code> have different semantics.</p>&#xA;&#xA;<pre><code>class base {&#xA;public:&#xA;    virtual foo(int i = 42) { cout &lt;&lt; \"base \" &lt;&lt; i; }&#xA;};&#xA;&#xA;class derived : public base {&#xA;public:&#xA;    virtual foo(int i = 12) { cout &lt;&lt; \"derived \"&lt;&lt; i; }&#xA;};&#xA;&#xA;derived d;&#xA;base&amp; b = d;&#xA;b.foo(); // Outputs `derived 42`&#xA;</code></pre></li>&#xA;</ul>&#xA;",
                "score": 4,
                "comments": [
                    {
                        "commentId": 1189992,
                        "score": 1,
                        "text": "That last one's a tricky one! Ouch!",
                        "createdDate": "2009-08-30T10:36:17",
                        "postId": null,
                        "author": {
                            "name": "j_random_hacker",
                            "authorId": 47984
                        },
                        "post": null
                    },
                    {
                        "commentId": 2878347,
                        "score": 0,
                        "text": "C# does the same thing (as the virtual/default value one), now that C# 4 has default values.",
                        "createdDate": "2010-05-14T19:02:07",
                        "postId": null,
                        "author": {
                            "name": "BlueRaja - Danny Pflughoeft",
                            "authorId": 238419
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "Motti",
                    "authorId": 3848
                }
            },
            {
                "postId": 48708,
                "creationDate": "2008-09-07T19:34:10",
                "body": "<p>Be careful when using smart pointers and container classes.</p>&#xA;",
                "score": 2,
                "comments": [
                    {
                        "commentId": 9741,
                        "score": 0,
                        "text": "Question for answer: What's wrong with using smart pointers with container classes?  ex: vector<shared_ptr<int> >.  Can you elaborate?",
                        "createdDate": "2008-09-17T05:23:21",
                        "postId": null,
                        "author": {
                            "name": "Aaron",
                            "authorId": 14153
                        },
                        "post": null
                    },
                    {
                        "commentId": 140970,
                        "score": 2,
                        "text": "he's referring to containers of auto_ptr which is forbidden but sometimes compiles",
                        "createdDate": "2008-11-15T22:00:21",
                        "postId": null,
                        "author": {
                            "name": "Dustin Getz",
                            "authorId": 20003
                        },
                        "post": null
                    },
                    {
                        "commentId": 1189998,
                        "score": 0,
                        "text": "@Aaron: Specifically, auto_ptr's assignment operator destroys its source operand, meaning it can't be used with standard containers which rely on this not happening. shared_ptr is fine however.",
                        "createdDate": "2009-08-30T10:38:59",
                        "postId": null,
                        "author": {
                            "name": "j_random_hacker",
                            "authorId": 47984
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "Registered User",
                    "authorId": 5087
                }
            },
            {
                "postId": 71386,
                "creationDate": "2008-09-16T11:29:52",
                "body": "<p>Brian has a great list: I'd add \"Always mark single argument constructors explicit (except in those rare cases you want automatic casting).\"</p>&#xA;",
                "score": 12,
                "comments": [],
                "author": {
                    "name": "0124816",
                    "authorId": 11521
                }
            },
            {
                "postId": 117741,
                "creationDate": "2008-09-22T21:25:17",
                "body": "<p>Not really a specific tip, but a general guideline: check your sources.  C++ is an old language, and it has changed a lot over the years.  Best practices have changed with it, but unfortunately there's still a lot of old information out there.  There have been some very good book recommendations on here - I can second buying every one of Scott Meyers C++ books.  Become familiar with Boost and with the coding styles used in Boost - the people involved with that project are on the cutting edge of C++ design.</p>&#xA;&#xA;<p>Do not reinvent the wheel.  Become familiar with the STL and Boost, and use their facilities whenever possible rolling your own.  In particular, use STL strings and collections unless you have a very, very good reason not to.  Get to know auto_ptr and the Boost smart pointers library very well, understand under which circumstances each type of smart pointer is intended to be used, and then use smart pointers everywhere you might otherwise have used raw pointers.  Your code will be just as efficient and a lot less prone to memory leaks.</p>&#xA;&#xA;<p>Use static_cast, dynamic_cast, const_cast, and reinterpret_cast instead of C-style casts.  Unlike C-style casts they will let you know if you are really asking for a different type of cast than you think you are asking for.  And they stand out viisually, alerting the reader that a cast is taking place.</p>&#xA;",
                "score": 8,
                "comments": [],
                "author": {
                    "name": "Avdi",
                    "authorId": 20487
                }
            },
            {
                "postId": 117788,
                "creationDate": "2008-09-22T21:34:25",
                "body": "<p>Avoid <a href=\"http://www.idinews.com/quasiClass.pdf\" rel=\"nofollow\">pseudo classes and quasi classes</a>... Overdesign basically.</p>&#xA;",
                "score": 2,
                "comments": [
                    {
                        "commentId": 3349553,
                        "score": 0,
                        "text": "I am currently working on such a project with (n) quasiclasses.  We need more awareness of this anti-pattern!",
                        "createdDate": "2010-07-14T01:26:36",
                        "postId": null,
                        "author": {
                            "name": "DarenW",
                            "authorId": 10468
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "epatel",
                    "authorId": 842
                }
            },
            {
                "postId": 117801,
                "creationDate": "2008-09-22T21:37:03",
                "body": "<ol>&#xA;<li>Not reading the <a href=\"http://www.parashift.com/c++-faq-lite/\" rel=\"nofollow\">C++ FAQ Lite</a>. It explains many bad (and good!) practices.</li>&#xA;<li>Not using <a href=\"http://en.wikipedia.org/wiki/Boost_%28C%2B%2B_libraries%29\" rel=\"nofollow\">Boost</a>. You'll save yourself a lot of frustration by taking advantage of Boost where possible.</li>&#xA;</ol>&#xA;",
                "score": 3,
                "comments": [],
                "author": {
                    "name": "teratorn",
                    "authorId": 14739
                }
            },
            {
                "postId": 117820,
                "creationDate": "2008-09-22T21:40:24",
                "body": "<p>Read the book <em><a href=\"http://rads.stackoverflow.com/amzn/click/0321125185\" rel=\"nofollow\">C++ Gotchas: Avoiding Common Problems in Coding and Design</a></em>.</p>&#xA;",
                "score": 1,
                "comments": [],
                "author": {
                    "name": "ilitirit",
                    "authorId": 9825
                }
            },
            {
                "postId": 281451,
                "creationDate": "2008-11-11T16:46:28",
                "body": "<p>Using C++ like C. Having a create-and-release cycle in the code.</p>&#xA;&#xA;<p>In C++, this is not exception safe and thus the release may not be executed. In C++, we use <a href=\"https://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization\" rel=\"nofollow\">RAII</a> to solve this problem.</p>&#xA;&#xA;<p>All resources that have a manual create and release should be wrapped in an object so these actions are done in the constructor/destructor.</p>&#xA;&#xA;<pre><code>// C Code&#xA;void myFunc()&#xA;{&#xA;    Plop*   plop = createMyPlopResource();&#xA;&#xA;    // Use the plop&#xA;&#xA;    releaseMyPlopResource(plop);&#xA;}&#xA;</code></pre>&#xA;&#xA;<p>In C++, this should be wrapped in an object:</p>&#xA;&#xA;<pre><code>// C++&#xA;class PlopResource&#xA;{&#xA;    public:&#xA;        PlopResource()&#xA;        {&#xA;            mPlop=createMyPlopResource();&#xA;            // handle exceptions and errors.&#xA;        }&#xA;        ~PlopResource()&#xA;        {&#xA;             releaseMyPlopResource(mPlop);&#xA;        }&#xA;    private:&#xA;        Plop*  mPlop;&#xA; };&#xA;&#xA;void myFunc()&#xA;{&#xA;    PlopResource  plop;&#xA;&#xA;    // Use the plop&#xA;    // Exception safe release on exit.&#xA;}&#xA;</code></pre>&#xA;",
                "score": 6,
                "comments": [
                    {
                        "commentId": 132410,
                        "score": 0,
                        "text": "i'm not sure whether we should add it. but maybe we should make it noncopyable/nonassignable?",
                        "createdDate": "2008-11-11T17:20:23",
                        "postId": null,
                        "author": {
                            "name": "Johannes Schaub - litb",
                            "authorId": 34509
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "Loki Astari",
                    "authorId": 14065
                }
            },
            {
                "postId": 281487,
                "creationDate": "2008-11-11T17:00:35",
                "body": "<p>Always check a pointer before you dereference it.  In C, you could usually count on a crash at the point where you dereference a bad pointer; in C++, you can create an invalid reference which will crash at a spot far removed from the source of the problem.</p>&#xA;&#xA;<pre><code>class SomeClass&#xA;{&#xA;    ...&#xA;    void DoSomething()&#xA;    {&#xA;        ++counter;    // crash here!&#xA;    }&#xA;    int counter;&#xA;};&#xA;&#xA;void Foo(SomeClass &amp; ref)&#xA;{&#xA;    ...&#xA;    ref.DoSomething();    // if DoSomething is virtual, you might crash here&#xA;    ...&#xA;}&#xA;&#xA;void Bar(SomeClass * ptr)&#xA;{&#xA;    Foo(*ptr);    // if ptr is NULL, you have created an invalid reference&#xA;                  // which probably WILL NOT crash here&#xA;}&#xA;</code></pre>&#xA;",
                "score": 0,
                "comments": [
                    {
                        "commentId": 132826,
                        "score": 0,
                        "text": "Checking for NULL does not help much. A pointer may have a non-null value and still point to a deleted or otherwise invalid object.",
                        "createdDate": "2008-11-11T20:46:44",
                        "postId": null,
                        "author": {
                            "name": "Nemanja Trifunovic",
                            "authorId": 8899
                        },
                        "post": null
                    },
                    {
                        "commentId": 133210,
                        "score": 0,
                        "text": "True, but in my experience a NULL pointer is more common than the other kinds of invalid pointers. Maybe that's because I make a habit of NULLing my pointers after deleting them.",
                        "createdDate": "2008-11-11T23:30:15",
                        "postId": null,
                        "author": {
                            "name": "Mark Ransom",
                            "authorId": 5987
                        },
                        "post": null
                    },
                    {
                        "commentId": 135144,
                        "score": 0,
                        "text": "This is part of your error-handling strategy.  I'ld say, avoid NULL pointer checking in the core code (rather assert), but guarantee you don't pass in invalid values (design by contract).",
                        "createdDate": "2008-11-12T19:45:35",
                        "postId": null,
                        "author": {
                            "name": "xtofl",
                            "authorId": 6610
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "Mark Ransom",
                    "authorId": 5987
                }
            },
            {
                "postId": 281562,
                "creationDate": "2008-11-11T17:25:51",
                "body": "<p>Intention is <code>(x == 10)</code>:</p>&#xA;&#xA;<pre><code>if (x = 10) {&#xA;    //Do something&#xA;}&#xA;</code></pre>&#xA;&#xA;<p>I thought I would never make this mistake myself, but I actually did it recently.</p>&#xA;",
                "score": 0,
                "comments": [
                    {
                        "commentId": 132811,
                        "score": 3,
                        "text": "Pretty much any compiler these days will issue a warning for this",
                        "createdDate": "2008-11-11T20:39:18",
                        "postId": null,
                        "author": {
                            "name": "Adam Rosenfield",
                            "authorId": 9530
                        },
                        "post": null
                    },
                    {
                        "commentId": 133711,
                        "score": 0,
                        "text": "doing a constant == to a variable will help spot these mistakes, say if( 10 = x ), the compiler will error out on that",
                        "createdDate": "2008-11-12T05:41:34",
                        "postId": null,
                        "author": {
                            "name": "PiNoYBoY82",
                            "authorId": 13646
                        },
                        "post": null
                    },
                    {
                        "commentId": 3269629,
                        "score": 0,
                        "text": "That doesn't help if you intended `if (x == y)`",
                        "createdDate": "2010-07-04T23:04:44",
                        "postId": null,
                        "author": {
                            "name": "dan04",
                            "authorId": 287586
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "blizpasta",
                    "authorId": 20646
                }
            },
            {
                "postId": 281593,
                "creationDate": "2008-11-11T17:38:46",
                "body": "<p>Keep the name spaces straight (including struct, class, namespace, and using).  That's my number-one frustration when the program just doesn't compile.</p>&#xA;",
                "score": 1,
                "comments": [],
                "author": {
                    "name": "David Thornley",
                    "authorId": 14148
                }
            },
            {
                "postId": 281609,
                "creationDate": "2008-11-11T17:43:24",
                "body": "<p>To mess up, use straight pointers a lot.  Instead, use RAII for almost anything, making sure of course that you use the right smart pointers.  If you write \"delete\" anywhere outside a handle or pointer-type class, you're very likely doing it wrong.</p>&#xA;",
                "score": 1,
                "comments": [],
                "author": {
                    "name": "David Thornley",
                    "authorId": 14148
                }
            },
            {
                "postId": 282070,
                "creationDate": "2008-11-11T20:40:00",
                "body": "<blockquote>&#xA;  <ul>&#xA;  <li><code>static_cast</code> downcast on a virtual base class</li>&#xA;  </ul>&#xA;</blockquote>&#xA;&#xA;<p>Not really... Now about my misconception: I thought that <code>A</code> in the following was a virtual base class when in fact it's not; it's, according to 10.3.1, a <em>polymorphic class</em>. Using <code>static_cast</code> here seems to be fine.</p>&#xA;&#xA;<pre><code>struct B { virtual ~B() {} };&#xA;&#xA;struct D : B { };&#xA;</code></pre>&#xA;&#xA;<p>In summary, yes, this is a dangerous pitfall.</p>&#xA;",
                "score": 1,
                "comments": [
                    {
                        "commentId": 133685,
                        "score": 0,
                        "text": "see my enhanced question above",
                        "createdDate": "2008-11-12T05:01:25",
                        "postId": null,
                        "author": {
                            "name": "Johannes Schaub - litb",
                            "authorId": 34509
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "Konrad Rudolph",
                    "authorId": 1968
                }
            },
            {
                "postId": 282921,
                "creationDate": "2008-11-12T03:22:42",
                "body": "<pre><code>#include &lt;boost/shared_ptr.hpp&gt;&#xA;class A {&#xA;public:&#xA;  void nuke() {&#xA;     boost::shared_ptr&lt;A&gt; (this);&#xA;  }&#xA;};&#xA;&#xA;int main(int argc, char** argv) {&#xA;  A a;&#xA;  a.nuke();&#xA;  return(0);&#xA;}&#xA;</code></pre>&#xA;",
                "score": -1,
                "comments": [
                    {
                        "commentId": 863496,
                        "score": 3,
                        "text": "Ones inability to use  boost::shared_ptr is hardly a pitfall of the language.",
                        "createdDate": "2009-06-27T01:55:43",
                        "postId": null,
                        "author": {
                            "name": "0xC0DEFACE",
                            "authorId": 126163
                        },
                        "post": null
                    },
                    {
                        "commentId": 1190025,
                        "score": 0,
                        "text": "+1. Though the shared_ptr docs state that this usage is not supported (and provide a workaround, enable_shared_from_this), this is a common use-case, and it's not immediately obvious that the above code will fail. It even appears to play by the rule of \"immediately wrap any raw pointer in a shared_ptr\". A genuine pitfall IMHO.",
                        "createdDate": "2009-08-30T10:49:28",
                        "postId": null,
                        "author": {
                            "name": "j_random_hacker",
                            "authorId": 47984
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "gsarkis",
                    "authorId": 36786
                }
            },
            {
                "postId": 285100,
                "creationDate": "2008-11-12T19:47:01",
                "body": "<p>Forgetting to define a base class destructor virtual. This means that calling <code>delete</code> on a Base* won't end up destructing the derived part.</p>&#xA;",
                "score": 2,
                "comments": [],
                "author": {
                    "name": "xtofl",
                    "authorId": 6610
                }
            },
            {
                "postId": 293047,
                "creationDate": "2008-11-15T21:02:15",
                "body": "<h2>Pitfalls in decreasing order of their importance</h2>&#xA;&#xA;<p>First of all, you should visit the award winning <a href=\"http://www.parashift.com/c++-faq-lite/\" rel=\"nofollow\">C++ FAQ Light</a>. It has many good answers to pitfalls. If you have further questions, visit <code>##c++</code> on <code>irc.freenode.org</code> in <a href=\"http://en.wikipedia.org/wiki/Internet_Relay_Chat\" rel=\"nofollow\">IRC</a>. We are glad to help you, if we can. Note all the following pitfalls are originally written. They are not just copied from random sources.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>delete<code>[]</code> on new, <code>delete</code> on <code>new[]</code></p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Doing the above yields to undefined behavior: Everything could happen. Understand your code and what it does, and always <code>delete[]</code> what you <code>new[]</code>, and <code>delete</code> what you <code>new</code>, then that won't happen.</p>&#xA;&#xA;<p><strong>Exception</strong>:</p>&#xA;&#xA;<pre><code>typedef T type[N]; T * pT = new type; delete[] pT;&#xA;</code></pre>&#xA;&#xA;<p>You need to <code>delete[]</code> even though you <code>new</code>, since you new'ed an array. So if you are working with <code>typedef</code>, take special care.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Calling a virtual function in a constructor or destructor</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Calling a virtual function won't call the overriding functions in the derived classes. Calling a <em>pure virtual function</em> in a constructor or desctructor is undefined behavior.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Calling <code>delete</code> or <code>delete[]</code> on an already deleted pointer</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Assign 0 to every pointer you delete. Calling <code>delete</code> or <code>delete[]</code> on a null-pointer does nothing.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Taking the sizeof of a pointer, when the number of elements of an 'array' is to be calculated.</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Pass the number of elements alongside the pointer when you need to pass an array as a pointer into a function. Use the function proposed <a href=\"http://stackoverflow.com/questions/275994/whats-the-best-way-to-do-a-backwards-loop-in-ccc#276053\">here</a> if you take the sizeof of an array that is supposed to be really an array.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Using an array as if it were a pointer. Thus, using <code>T **</code> for a two dimentional array.</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: See <a href=\"http://stackoverflow.com/questions/274865/pointer-question-in-c#274943\">here</a> for why they are different and how you handle them.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Writing to a string literal: <code>char * c = \"hello\"; *c = 'B';</code></p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Allocate an array that is initialized from the data of the string literal, then you can write to it:</p>&#xA;&#xA;<pre><code>char c[] = \"hello\"; *c = 'B';&#xA;</code></pre>&#xA;&#xA;<p>Writing to a string literal is undefined behavior. Anyway, the above conversion from a string literal to <code>char *</code> is deprecated. So compilers will probably warn if you increase the warning level.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Creating resources, then forgetting to free them when something throws.</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Use smart pointers like <a href=\"http://en.cppreference.com/w/cpp/memory/unique_ptr\" rel=\"nofollow\"><code>std::unique_ptr</code></a> or <a href=\"http://en.cppreference.com/w/cpp/memory/shared_ptr\" rel=\"nofollow\"><code>std::shared_ptr</code></a> as pointed out by other answers.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Modifying an object twice like in this example: <code>i = ++i;</code></p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: The above was supposed to assign to <code>i</code> the value of <code>i+1</code>. But what it does is not defined. Instead of incrementing <code>i</code> and assigning the result, it changes <code>i</code> on the right side as well. Changing an object between two sequence points is undefined behavior. Sequence points include <code>||</code>, <code>&amp;&amp;</code>, <code>comma-operator</code>, <code>semicolon</code> and <code>entering a function</code> (non exhaustive list!). Change the code to the following to make it behave correctly: <code>i = i + 1;</code></p>&#xA;&#xA;<hr>&#xA;&#xA;<h2>Misc Issues</h2>&#xA;&#xA;<blockquote>&#xA;  <p>Forgetting to flush streams before calling a blocking function like <code>sleep</code>.</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Flush the stream by streaming either <code>std::endl</code> instead of <code>\\n</code> or by calling <code>stream.flush();</code>.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Declaring a function instead of a variable.</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: The issue arises because the compiler interprets for example</p>&#xA;&#xA;<pre><code>Type t(other_type(value));&#xA;</code></pre>&#xA;&#xA;<p>as a function declaration of a function <code>t</code> returning <code>Type</code> and having a parameter of type <code>other_type</code> which is called <code>value</code>. You solve it by putting parentheses around the first argument. Now you get a variable <code>t</code> of type <code>Type</code>:</p>&#xA;&#xA;<pre><code>Type t((other_type(value)));&#xA;</code></pre>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Calling the function of a free object that is only declared in the current translation unit (<code>.cpp</code> file).</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: The standard doesn't define the order of creation of free objects (at namespace scope) defined across different translation units. Calling a member function on an object not yet constructed is undefined behavior. You can define the following function in the object's translation unit instead and call it from other ones:</p>&#xA;&#xA;<pre><code>House &amp; getTheHouse() { static House h; return h; }&#xA;</code></pre>&#xA;&#xA;<p>That would create the object on demand and leave you with a fully constructed object at the time you call functions on it.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Defining a template in a <code>.cpp</code> file, while it's used in a different <code>.cpp</code> file.</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: Almost always you will get errors like <code>undefined reference to ...</code>. Put all the template definitions in a header, so that when the compiler is using them, it can already produce the code needed.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p><code>static_cast&lt;Derived*&gt;(base);</code> if base is a pointer to a virtual base class of <code>Derived</code>.</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: A virtual base class is a base which occurs only once, even if it is inherited more than once by different classes indirectly in an inheritance tree. Doing the above is not allowed by the Standard. Use dynamic_cast to do that, and make sure your base class is polymorphic.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p><code>dynamic_cast&lt;Derived*&gt;(ptr_to_base);</code> if base is non-polymorphic</p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: The standard doesn't allow a downcast of a pointer or reference when the object passed is not polymorphic. It or one of its base classes has to have a virtual function.</p>&#xA;&#xA;<hr>&#xA;&#xA;<blockquote>&#xA;  <p>Making your function accept <code>T const **</code></p>&#xA;</blockquote>&#xA;&#xA;<p><strong>Solution</strong>: You might think that's safer than using <code>T **</code>, but actually it will cause headache to people that want to pass <code>T**</code>: The standard doesn't allow it. It gives a neat example of why it is disallowed:</p>&#xA;&#xA;<pre><code>int main() {&#xA;    char const c = ’c’;&#xA;    char* pc;&#xA;    char const** pcc = &amp;pc; //1: not allowed&#xA;    *pcc = &amp;c;&#xA;    *pc = ’C’; //2: modifies a const object&#xA;}&#xA;</code></pre>&#xA;&#xA;<p>Always accept <code>T const* const*;</code> instead.</p>&#xA;&#xA;<h2></h2>&#xA;&#xA;<p>Another (closed) pitfalls thread about C++, so people looking for them will find them, is Stack Overflow question <em><a href=\"http://stackoverflow.com/questions/280531\">C++ pitfalls</a></em>.</p>&#xA;",
                "score": 45,
                "comments": [
                    {
                        "commentId": 1187848,
                        "score": 1,
                        "text": "a[i] = ++i; //reading a variable twice which is modified leads to undefined behavior ...you can add this also if u wish",
                        "createdDate": "2009-08-29T15:18:25",
                        "postId": null,
                        "author": {
                            "name": "yesraaj",
                            "authorId": 22076
                        },
                        "post": null
                    },
                    {
                        "commentId": 1189983,
                        "score": 2,
                        "text": "+1, many good points. The one about mixing typedef and delete[] was totally new to me!  Yet another corner case to remember... :(",
                        "createdDate": "2009-08-30T10:32:30",
                        "postId": null,
                        "author": {
                            "name": "j_random_hacker",
                            "authorId": 47984
                        },
                        "post": null
                    },
                    {
                        "commentId": 2542484,
                        "score": 2,
                        "text": "\"Assign 0 to every pointer you delete.\" <-- Sorry, but wrong. The only solution is to not write the bug in the first place. It's entirely possible someone made a copy of that pointer which will not be affected by you setting it to zero.",
                        "createdDate": "2010-03-29T22:45:33",
                        "postId": null,
                        "author": {
                            "name": "Billy ONeal",
                            "authorId": 82320
                        },
                        "post": null
                    },
                    {
                        "commentId": 2543916,
                        "score": 0,
                        "text": "@BillyONeal, you cannot detect whether you deleted a pointer already if you don't set it to null after you delete it. It's not necessarily a bug to delete twice, if you just set it to null afterwards, thus my proposed solution.",
                        "createdDate": "2010-03-30T05:18:17",
                        "postId": null,
                        "author": {
                            "name": "Johannes Schaub - litb",
                            "authorId": 34509
                        },
                        "post": null
                    },
                    {
                        "commentId": 2546138,
                        "score": 0,
                        "text": "@Johannes Schaub - litb: True, but my point is that's not foolproof. If somebody has a copy of the pointer and tries to delete it you still have double-free problems.",
                        "createdDate": "2010-03-30T12:27:59",
                        "postId": null,
                        "author": {
                            "name": "Billy ONeal",
                            "authorId": 82320
                        },
                        "post": null
                    },
                    {
                        "commentId": 2550215,
                        "score": 0,
                        "text": "@BillyONeal, right. You shouldn't copy the pointer, and then nullify only the original. That's indeed another bug that this won't solve. Not deleting twice on a pointer won't solve it either, because even if you still delete each pointer once - once the copy and once the original, then in the end you have still called delete twice for the same object. This is another pitfall which wasn't meant to be addressed by my entry. I agree with you on that, the real solution for *that* kind of bug is to search and fix that problem.",
                        "createdDate": "2010-03-30T20:58:35",
                        "postId": null,
                        "author": {
                            "name": "Johannes Schaub - litb",
                            "authorId": 34509
                        },
                        "post": null
                    }
                ],
                "author": {
                    "name": "Johannes Schaub - litb",
                    "authorId": 34509
                }
            },
            {
                "postId": 293080,
                "creationDate": "2008-11-15T21:34:30",
                "body": "<p>The essay/article <em><a href=\"http://www.goingware.com/tips/parameters/\" rel=\"nofollow\">Pointers, references and Values</a></em> is very useful. It talks avoid avoiding pitfalls and good practices. You can browse the whole site too, which contains programming tips, mainly for C++.</p>&#xA;",
                "score": 0,
                "comments": [],
                "author": {
                    "name": "lurks",
                    "authorId": 1876
                }
            },
            {
                "postId": 754364,
                "creationDate": "2009-04-16T00:46:18",
                "body": "<p>I spent many years doing C++ development. I wrote a <a href=\"http://btstout.blogspot.com/2005_09_01_archive.html\" rel=\"nofollow\">quick summary</a> of problems I had with it years ago. Standards-compliant compilers are not really a problem anymore, but I suspect the other pitfalls outlined are still valid.</p>&#xA;",
                "score": 0,
                "comments": [],
                "author": {
                    "name": "Todd Stout",
                    "authorId": 59768
                }
            },
            {
                "postId": 3986213,
                "creationDate": "2010-10-21T09:52:39",
                "body": "<p>Forgetting an <code>&amp;</code> and thereby creating a copy instead of a reference.</p>&#xA;&#xA;<p>This happened to me twice in different ways:</p>&#xA;&#xA;<ul>&#xA;<li><p>One instance was in an argument list, which caused a large object to be put on the stack with the result of a stack overflow and crash of the embedded system.</p></li>&#xA;<li><p>I forgot the <code>&amp;</code> on an instance variable, with the effect that the object was copied. After registering as a listener to the copy I wondered why I never got the callbacks from the original object.</p></li>&#xA;</ul>&#xA;&#xA;<p>Both where rather hard to spot, because the difference is small and hard to see, and otherwise objects and references are used syntactically in the same way.</p>&#xA;",
                "score": 0,
                "comments": [],
                "author": {
                    "name": "starblue",
                    "authorId": 49246
                }
            }
        ],
        "tags": [
            "c++",
            "stl"
        ],
        "postLinks": [
            {
                "postId": 36832,
                "creationDate": "2008-08-31T12:37:24",
                "body": "<p>In C++ when a virtual function is called from within a constructor it doesn't behave like a virtual function. I think everyone who encountered for the first time was surprised but on second thought it makes sense, if the derived constructor hasn't yet run the object is <strong>not</strong> yet a <em>derived</em> so how can a derived function be called? The preconditions haven't had the chance to be set up. Example:</p>&#xA;&#xA;<pre><code>class base {&#xA;public:&#xA;    base()&#xA;    {&#xA;        std::cout &lt;&lt; \"foo is \" &lt;&lt; foo() &lt;&lt; std::endl;&#xA;    }&#xA;    virtual int foo() { return 42; }&#xA;};&#xA;&#xA;class derived : public foo {&#xA;    int* ptr_;&#xA;public:&#xA;    derived(int i) : ptr_(new int(i*i)) { }&#xA;    // The following cannot be called before derived::derived due to how C++ behaves, &#xA;    // if it was possible... Kaboom!&#xA;    virtual int foo()   { return *ptr_; } &#xA;};&#xA;</code></pre>&#xA;&#xA;<p>It's exactly the same for Java and .NET yet they chose to go the other way, was the only reason <em>the principal of least surprise</em>? </p>&#xA;&#xA;<p>Which do you think is the correct choice?</p>&#xA;",
                "score": 12,
                "comments": null,
                "author": null
            },
            {
                "postId": 274865,
                "creationDate": "2008-11-08T16:03:42",
                "body": "<p>I am modifying some code and came across a declaration that I am having trouble understanding:</p>&#xA;&#xA;<pre><code>int *userMask[3][4] = {0};&#xA;</code></pre>&#xA;&#xA;<p>What exactly is this pointing to?  Is it a matrix where every element is a pointer?  Or is it pointing to a matrix of size [3][4]?</p>&#xA;&#xA;<p>Thanks</p>&#xA;&#xA;<hr>&#xA;&#xA;<p>I guess my question is how <code>userMask[2][maskElement][user]</code> can work when it is declared as <code>int</code>.  Wouldn't userMask have to be <code>int[]</code> for that to work properly?  I must not be understanding this right...</p>&#xA;&#xA;<p>On a side note, thanks for your suggestion about cdecl Robert.  However, does anyone know how to use it in an XP command prompt?  All I can get is syntax error :(</p>&#xA;",
                "score": 17,
                "comments": null,
                "author": null
            },
            {
                "postId": 275994,
                "creationDate": "2008-11-09T15:07:29",
                "body": "<p>I need to move backwards through an array, so I have code like this:</p>&#xA;&#xA;<pre><code>for (int i = myArray.Length - 1; i &gt;= 0; i--)&#xA;{&#xA;    // Do something&#xA;    myArray[i] = 42;&#xA;}&#xA;</code></pre>&#xA;&#xA;<p>Is there a better way of doing this?</p>&#xA;&#xA;<p>Update: I was hoping that maybe C# had some built-in mechanism for this like:</p>&#xA;&#xA;<pre><code>foreachbackwards (int i in myArray)&#xA;{&#xA;    // so easy&#xA;}&#xA;</code></pre>&#xA;&#xA;<p>Update 2: There <em>are</em> better ways. Rune takes the prize with:</p>&#xA;&#xA;<pre><code>for (int i = myArray.Length; i-- &gt; 0; )&#xA;{    &#xA;    //do something&#xA;}&#xA;//or&#xA;for (int i = myArray.Length; i --&gt; 0; )&#xA;{&#xA;    // do something&#xA;}&#xA;</code></pre>&#xA;&#xA;<p>which looks even better in regular C (thanks to Twotymz):</p>&#xA;&#xA;<pre><code>for (int i = lengthOfArray; i--; )&#xA;{    &#xA;    //do something&#xA;}&#xA;</code></pre>&#xA;",
                "score": 52,
                "comments": null,
                "author": null
            }
        ]
    }
});

export default connect(mapStateToProps)(SinglePost);